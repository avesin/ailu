import chatReducer from '@/src/features/chat/chat_slice';
import llmSlice from "@/src/redux/llm_store";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    databaseChat: chatReducer,
    llm: llmSlice,
  },
});

// Types (important for TypeScript)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;