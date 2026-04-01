import llmApi from "@/src/core/api/llm_api";
import { LLMResponse } from "@/src/core/types/llm";
import { persistNewMessage } from '@/src/features/chat/chat_persisted';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


interface LLMState {
    loading: boolean;
    response: string | null;
    error: string | null;
}

const initialState: LLMState = {
    loading: false,
    response: null,
    error: null,
};

export const sendPrompt = createAsyncThunk<
    LLMResponse,
    { idgroup: string, messages: Array<{ role: string, content: string }> }
>("llm/sendPrompt", async ({ idgroup, messages }) => {
    const reg = {
        model: "qwen2.5-14b-instruct-abliterated-v2",
        messages: messages,
    };
    const response = await llmApi.post<LLMResponse>(
        "/chat/completions", reg
    );
    const payload = {
        idGroup: idgroup,
        text: response.data.choices?.[0]?.message?.content || '',
        sender: 'ai' as const
    };
    const newMessage = {
        id: Date.now().toString(),
        ...payload,
        key: `chat_${payload.idGroup}_${Date.now()}`,
        timestamp: Date.now(),
    };
    persistNewMessage(newMessage);
    return response.data;
});

const llmSlice = createSlice({
    name: "llm",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendPrompt.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendPrompt.fulfilled, (state, action) => {
                state.loading = false;
                state.response = action.payload.choices?.[0]?.message?.content;
            })
            .addCase(sendPrompt.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Error";
            });
    },
});

export default llmSlice.reducer;