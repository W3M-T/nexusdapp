import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  GameState,
  KAPPAX_EGGS,
  KINGDOMS,
  MERMAID_CHARACTERS,
  NarratorMessage,
  PlayerState,
  GameLocation,
  WorldState,
} from "../../types/game";
import { RootState } from "../store";

// ============================================
// Async Thunks
// ============================================

export const loadGameState = createAsyncThunk(
  "game/loadState",
  async (address: string) => {
    const res = await axios.get(`/api/gameState?address=${address}`);
    return res.data.state;
  }
);

export const saveGameState = createAsyncThunk(
  "game/saveState",
  async ({ address, state }: { address: string; state: PlayerState }) => {
    await axios.post("/api/gameState", { address, state });
    return true;
  }
);

export const fetchWorldState = createAsyncThunk(
  "game/fetchWorldState",
  async (kingdomId?: string) => {
    const url = kingdomId
      ? `/api/worldState?kingdomId=${kingdomId}`
      : "/api/worldState";
    const res = await axios.get(url);
    return res.data;
  }
);

export const postWorldEvent = createAsyncThunk(
  "game/postWorldEvent",
  async (event: {
    eventType: string;
    kingdomId: string;
    address: string;
    explorerName: string;
    data: Record<string, unknown>;
  }) => {
    await axios.post("/api/worldState", event);
    return true;
  }
);

export const sendNarratorMessage = createAsyncThunk(
  "game/narrate",
  async (
    {
      playerAction,
      gameContext,
    }: {
      playerAction: string;
      gameContext: Record<string, unknown>;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post("/api/narrator", {
        playerAction,
        gameContext,
      });
      return res.data;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      return rejectWithValue(
        error.response?.data?.message || "Narrator unavailable"
      );
    }
  }
);

// ============================================
// Initial State
// ============================================

const initialState: GameState = {
  player: null,
  messages: [],
  isNarrating: false,
  kingdoms: KINGDOMS,
  characters: MERMAID_CHARACTERS,
  availableActions: [
    "Look around",
    "Search for Kappax eggs",
    "Talk to a local mermaid",
    "Check your inventory",
  ],
  worldState: null,
};

// ============================================
// Slice
// ============================================

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    initPlayer: (
      state,
      action: PayloadAction<{ address: string; name: string }>
    ) => {
      state.player = {
        address: action.payload.address,
        explorerName: action.payload.name,
        currentLocation: { kingdomId: "shellhaven", zone: "entrance" },
        visitedKingdoms: ["shellhaven"],
        kappaxEggs: [],
        mermaidRole: "nixie",
        storyProgress: 0,
        lastNarration: "",
        health: 100,
        reputation: {
          abyssia: 0,
          coralheim: 0,
          tidecrest: 0,
          luminara: 0,
          glacimera: 0,
          verdantia: 0,
          shellhaven: 10,
          thornveil: 0,
          pelagora: 0,
        },
      };
      state.messages = [
        {
          id: "welcome",
          role: "narrator",
          content: `Welcome to the Tribeden Kingdoms, ${action.payload.name}. You are a Nixie — an unevolved mermaid, fresh and untested. You stand at the entrance of Shellhaven, the great sanctuary carved into an ancient colossal shell. The warm currents carry whispers of Kappax eggs hidden in distant waters. Your journey begins here.`,
          timestamp: Date.now(),
        },
      ];
      state.availableActions = [
        "Enter Shellhaven",
        "Look around the entrance",
        "Talk to Mentor Calypsa",
        "Check the waters beyond",
      ];
    },

    restorePlayer: (
      state,
      action: PayloadAction<{
        player: PlayerState;
        messages: NarratorMessage[];
      }>
    ) => {
      state.player = action.payload.player;
      state.messages = action.payload.messages || [];
    },

    addMessage: (state, action: PayloadAction<NarratorMessage>) => {
      state.messages.push(action.payload);
      // Keep only last 50 messages in memory
      if (state.messages.length > 50) {
        state.messages = state.messages.slice(-50);
      }
    },

    updateLocation: (state, action: PayloadAction<GameLocation>) => {
      if (state.player) {
        state.player.currentLocation = action.payload;
        if (
          !state.player.visitedKingdoms.includes(action.payload.kingdomId)
        ) {
          state.player.visitedKingdoms.push(action.payload.kingdomId);
        }
      }
    },

    collectKappax: (state, action: PayloadAction<string>) => {
      if (state.player) {
        const egg = KAPPAX_EGGS.find((e) => e.id === action.payload);
        if (egg && !state.player.kappaxEggs.find((e) => e.id === egg.id)) {
          state.player.kappaxEggs.push({ ...egg, discovered: true });
        }
      }
    },

    updateHealth: (state, action: PayloadAction<number>) => {
      if (state.player) {
        state.player.health = Math.max(0, Math.min(100, action.payload));
      }
    },

    setAvailableActions: (state, action: PayloadAction<string[]>) => {
      state.availableActions = action.payload;
    },

    evolveMermaid: (
      state,
      action: PayloadAction<
        "delfina" | "nubela" | "brynn" | "shimmer"
      >
    ) => {
      if (state.player) {
        state.player.mermaidRole = action.payload;
      }
    },

    resetGame: (state) => {
      state.player = null;
      state.messages = [];
      state.availableActions = initialState.availableActions;
    },
  },
  extraReducers: (builder) => {
    builder
      // Narrator
      .addCase(sendNarratorMessage.pending, (state) => {
        state.isNarrating = true;
      })
      .addCase(sendNarratorMessage.fulfilled, (state, action) => {
        state.isNarrating = false;
        const { narration, actions, kappaxFound, newLocation, healthChange } =
          action.payload;

        // Add narrator message
        state.messages.push({
          id: `narrator_${Date.now()}`,
          role: "narrator",
          content: narration,
          timestamp: Date.now(),
        });

        // Update actions
        if (actions?.length > 0) {
          state.availableActions = actions;
        }

        // Collect Kappax
        if (kappaxFound && state.player) {
          const egg = KAPPAX_EGGS.find((e) => e.id === kappaxFound);
          if (
            egg &&
            !state.player.kappaxEggs.find((e) => e.id === egg.id)
          ) {
            state.player.kappaxEggs.push({ ...egg, discovered: true });
          }
        }

        // Update location
        if (newLocation && state.player) {
          state.player.currentLocation = newLocation;
          if (
            !state.player.visitedKingdoms.includes(newLocation.kingdomId)
          ) {
            state.player.visitedKingdoms.push(newLocation.kingdomId);
          }
        }

        // Update health
        if (healthChange !== null && healthChange !== undefined && state.player) {
          state.player.health = Math.max(
            0,
            Math.min(100, healthChange)
          );
        }

        // Keep last 50 messages
        if (state.messages.length > 50) {
          state.messages = state.messages.slice(-50);
        }

        if (state.player) {
          state.player.lastNarration = narration;
          state.player.storyProgress += 1;
        }
      })
      .addCase(sendNarratorMessage.rejected, (state, action) => {
        state.isNarrating = false;
        state.messages.push({
          id: `error_${Date.now()}`,
          role: "system",
          content: `The narrator's voice fades... (${action.payload || "Connection lost"})`,
          timestamp: Date.now(),
        });
      })
      // World state
      .addCase(fetchWorldState.fulfilled, (state, action) => {
        state.worldState = action.payload;
      })
      // Load game state
      .addCase(loadGameState.fulfilled, (state, action) => {
        if (action.payload) {
          const saved = action.payload;
          if (saved.player) {
            state.player = saved.player;
          }
          if (saved.messages) {
            state.messages = saved.messages;
          }
          if (saved.availableActions) {
            state.availableActions = saved.availableActions;
          }
        }
      });
  },
});

export const {
  initPlayer,
  restorePlayer,
  addMessage,
  updateLocation,
  collectKappax,
  updateHealth,
  setAvailableActions,
  evolveMermaid,
  resetGame,
} = gameSlice.actions;

// ============================================
// Selectors
// ============================================

export const selectPlayer = (state: RootState) => state.game.player;
export const selectMessages = (state: RootState) => state.game.messages;
export const selectIsNarrating = (state: RootState) => state.game.isNarrating;
export const selectKingdoms = (state: RootState) => state.game.kingdoms;
export const selectCharacters = (state: RootState) => state.game.characters;
export const selectAvailableActions = (state: RootState) =>
  state.game.availableActions;
export const selectWorldState = (state: RootState) => state.game.worldState;
export const selectCurrentKingdom = (state: RootState) => {
  const player = state.game.player;
  if (!player) return null;
  return (
    state.game.kingdoms.find(
      (k) => k.id === player.currentLocation.kingdomId
    ) || null
  );
};

export default gameSlice.reducer;
