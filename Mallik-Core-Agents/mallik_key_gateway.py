# ©Nirajmallik@hub
# Copyright (c) 2026 Niraj Mallik (Mallik Group / nirajmallik143-hub)
# Licensed under the MIT License.

import os

class MallikGroupKeyGateway:
    """
    Unified 18-digit Mallik Group Master API Key gateway.
    Validates the 18-digit master key and dispatches underlying provider keys
    for Sikshya-AI, EcoThread, USA-auto, and Yummy-Studio-Automation.
    """

    PROVIDER_MAP = {
        "gemini": "GEMINI_API_KEY",
        "openai": "OPENAI_API_KEY",
        "anthropic": "ANTHROPIC_API_KEY",
        "deepseek": "DEEPSEEK_API_KEY",
        "elevenlabs": "ELEVENLABS_API_KEY",
        "vercel": "VERCEL_TOKEN",
    }

    def __init__(self, client_key: str | None = None):
        self.master_key = os.getenv("MALLIK_GROUP_API_KEY", "").strip()
        self.client_key = (client_key or self.master_key).strip()

    def validate(self) -> bool:
        return (
            len(self.client_key) == 18
            and self.client_key.isdigit()
            and self.client_key == self.master_key
        )

    def get_provider_key(self, provider: str) -> str:
        if not self.validate():
            raise PermissionError("Invalid 18-digit Mallik Group API Key.")
        env_var = self.PROVIDER_MAP.get(provider.lower())
        if not env_var:
            raise ValueError(f"Unsupported provider: {provider}")
        key = os.getenv(env_var, "").strip()
        if not key:
            raise EnvironmentError(f"{env_var} is not configured in environment.")
        return key

    def active_providers(self) -> list[str]:
        if not self.validate():
            raise PermissionError("Invalid 18-digit Mallik Group API Key.")
        return [
            name for name, env_var in self.PROVIDER_MAP.items()
            if os.getenv(env_var, "").strip()
        ]

if __name__ == "__main__":
    gw = MallikGroupKeyGateway("794208165392481026")
    print("Master Key Valid (18 digits):", gw.validate())
    print("Active Providers Behind Master Key:", gw.active_providers())
