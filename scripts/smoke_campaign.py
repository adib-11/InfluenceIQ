from __future__ import annotations

import argparse
from http.cookiejar import CookieJar
import json
import sys
import time
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.request import HTTPCookieProcessor, Request, build_opener


DEMO_USER = {
    "company_name": "Northwind Outdoor",
    "name": "Elena Park",
    "email": "elena@northwind.co",
    "password": "password123",
}


DEFAULT_PAYLOAD = {
    "brand": "Acme Health",
    "product": "Daily Greens",
    "category": "Wellness",
    "goal": "Find brand-safe wellness creators",
    "platforms": ["instagram", "youtube"],
}


class ApiClient:
    def __init__(self, base_url: str) -> None:
        self.base_url = base_url.rstrip("/")
        self.opener = build_opener(HTTPCookieProcessor(CookieJar()))

    def request_json(self, method: str, path: str, payload: dict[str, Any] | None = None) -> Any:
        data = json.dumps(payload).encode("utf-8") if payload is not None else None
        request = Request(
            f"{self.base_url}{path}",
            data=data,
            method=method,
            headers={"Content-Type": "application/json", "Accept": "application/json"},
        )
        with self.opener.open(request, timeout=10) as response:
            return json.loads(response.read().decode("utf-8"))

    def authenticate_demo_user(self) -> None:
        try:
            self.request_json("POST", "/api/auth/signup", DEMO_USER)
            print(f"auth.signup email={DEMO_USER['email']}")
        except HTTPError as exc:
            if exc.code != 409:
                raise
            self.request_json(
                "POST",
                "/api/auth/login",
                {"email": DEMO_USER["email"], "password": DEMO_USER["password"]},
            )
            print(f"auth.login email={DEMO_USER['email']}")


def main() -> int:
    parser = argparse.ArgumentParser(description="Run an end-to-end InfluenceIQ campaign smoke test.")
    parser.add_argument("--base-url", default="http://localhost:8000")
    parser.add_argument("--timeout", type=int, default=120)
    parser.add_argument("--interval", type=float, default=2.0)
    args = parser.parse_args()

    client = ApiClient(args.base_url)

    try:
        health = client.request_json("GET", "/health")
        print(f"health.status={health.get('status')} db={health.get('db')} redis={health.get('redis')}")

        client.authenticate_demo_user()
        created = client.request_json("POST", "/api/campaigns", DEFAULT_PAYLOAD)
        campaign_id = created["campaign_id"]
        print(f"campaign_id={campaign_id}")

        deadline = time.monotonic() + args.timeout
        state: dict[str, Any] = {}
        while time.monotonic() < deadline:
            state = client.request_json("GET", f"/api/campaigns/{campaign_id}/state")
            status = state.get("status")
            phase = state.get("phase")
            print(f"state.status={status} phase={phase}")
            if status in {"completed", "failed"}:
                break
            time.sleep(args.interval)

        if state.get("status") != "completed":
            print(f"Smoke test failed: campaign did not complete. Last state: {state}", file=sys.stderr)
            return 1

        influencers = client.request_json("GET", f"/api/campaigns/{campaign_id}/influencers")
        items = influencers.get("items", [])
        if len(items) < 4:
            print(
                f"Smoke test failed: expected at least 4 influencers, received {len(items)}.",
                file=sys.stderr,
            )
            return 1

        print(f"smoke.ok campaign_id={campaign_id} influencers={len(items)}")
        return 0
    except (HTTPError, URLError, TimeoutError, KeyError, json.JSONDecodeError) as exc:
        print(f"Smoke test failed: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
