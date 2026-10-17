#!/usr/bin/env python3
"""Push a local directory to a new GitHub repo via the git-database API (api.github.com only).
Usage: gh-push.py <owner> <repo> <localdir> <branch> [--exclude ...]
Creates blobs -> tree -> commit -> ref. Binary-safe (base64).
"""
import base64
import json
import os
import sys
import urllib.request
import urllib.error

sys.path.insert(0, "/opt/muse/skills/custom-connector-setup/bin")
from dynamic_credentials import add_surrogate_to_request, read_json_response

API = "https://api.github.com"
HOSTS = ["api.github.com"]
CRED = "custom.github-pat"


def call(method, path, data=None):
    req = urllib.request.Request(API + path, method=method)
    req.add_header("Accept", "application/vnd.github+json")
    req.add_header("User-Agent", "muse-github-pat")
    add_surrogate_to_request(req, CRED, allowed_hosts=HOSTS)
    body = json.dumps(data).encode() if data is not None else None
    if body:
        req.add_header("Content-Type", "application/json")
        req.data = body
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            if resp.status in (204,):
                return {}
            return read_json_response(resp)
    except urllib.error.HTTPError as e:
        try:
            err = json.loads(e.read().decode())
        except Exception:
            err = {"message": str(e)}
        print(f"HTTP {e.code} {method} {path}: {json.dumps(err)[:300]}", file=sys.stderr)
        sys.exit(1)


def main():
    args = sys.argv[1:]
    if len(args) < 4:
        print(__doc__)
        sys.exit(2)
    owner, repo, localdir = args[0], args[1], args[2]
    branch = args[3]
    excludes = set(args[4:]) | {".git", "node_modules", "dist"}

    base = f"/repos/{owner}/{repo}"
    # parent commit (if branch exists)
    parent = None
    try:
        ref = call("GET", f"{base}/git/ref/heads/{branch}")
        parent = ref["object"]["sha"]
    except SystemExit:
        parent = None  # ref doesn't exist yet -> first commit

    tree_items = []
    count = 0
    for root, dirs, files in os.walk(localdir):
        dirs[:] = [d for d in dirs if d not in excludes]
        for fn in sorted(files):
            p = os.path.join(root, fn)
            rel = os.path.relpath(p, localdir)
            if rel.split(os.sep)[0] in excludes:
                continue
            with open(p, "rb") as f:
                raw = f.read()
            if len(raw) > 900_000:
                print(f"SKIP (too big): {rel}", file=sys.stderr)
                continue
            blob = call("POST", f"{base}/git/blobs", {
                "content": base64.b64encode(raw).decode(),
                "encoding": "base64",
            })
            tree_items.append({"path": rel, "mode": "100644", "type": "blob", "sha": blob["sha"]})
            count += 1
            if count % 50 == 0:
                print(f"  ...{count} blobs", flush=True)
    print(f"blobs: {count}")

    tree = call("POST", f"{base}/git/trees", {"tree": tree_items})
    commit_data = {"message": os.environ.get("COMMIT_MSG", f"deploy {branch}"), "tree": tree["sha"]}
    if parent:
        commit_data["parents"] = [parent]
    commit = call("POST", f"{base}/git/commits", commit_data)
    if parent:
        call("PATCH", f"{base}/git/refs/heads/{branch}", {"sha": commit["sha"]})
    else:
        call("POST", f"{base}/git/refs", {"ref": f"refs/heads/{branch}", "sha": commit["sha"]})
    print(f"branch {branch} -> {commit['sha']}")


if __name__ == "__main__":
    main()
