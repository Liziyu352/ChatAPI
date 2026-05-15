from __future__ import annotations

from dataclasses import dataclass

from .assistant import AssistantService
from .auth import AuthContext
from .config import Settings
from .pending import PendingTurnRegistry
from .store import ConversationStore


@dataclass(frozen=True)
class AppDependencies:
    settings: Settings
    auth: AuthContext
    store: ConversationStore
    assistant: AssistantService
    pending_turns: PendingTurnRegistry
