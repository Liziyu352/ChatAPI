from __future__ import annotations

from flask import Flask
from flask_cors import CORS

from .assistant import AssistantService
from .auth import AuthContext
from .config import settings
from .dependencies import AppDependencies
from .pending import PendingTurnRegistry
from .routes import (
    register_auth_routes,
    register_conversation_routes,
    register_response_routes,
)
from .store import ConversationStore


def create_app() -> Flask:
    app = Flask(__name__)
    app.config.update(SECRET_KEY=settings.session_secret)
    CORS(app, supports_credentials=True, origins=settings.cors_origins)

    store = ConversationStore(settings.db_path)
    assistant = AssistantService(settings)
    auth = AuthContext(settings)
    pending_turns = PendingTurnRegistry()
    deps = AppDependencies(
        settings=settings,
        auth=auth,
        store=store,
        assistant=assistant,
        pending_turns=pending_turns,
    )
    app.extensions["chat_store"] = store
    app.extensions["assistant_service"] = assistant

    @app.get("/api/health")
    def health():
        return {"ok": True, "title": settings.title}

    register_auth_routes(app, auth=auth, settings=settings)
    register_conversation_routes(app, deps=deps)
    register_response_routes(app, deps=deps)

    return app
