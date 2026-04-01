import { StateStatus } from '@/src/redux/constants';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPersistedChatsById, getPersistedGroups, persistNewMessage } from './chat_persisted';

export const hydrateChatById = createAsyncThunk(
    'chat/hydrateById',
    async (id: string) => {
        const data = await getPersistedChatsById(id);
        return data;
    }
);

export const hydrateChatGroups = createAsyncThunk(
    'chat/hydrateGroups',
    async () => {
        const data = await getPersistedGroups();
        return data;
    }
);

export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async (payload: { idGroup: string, text: string, sender: 'user' | 'ai' }) => {
        const newMessage = {
            id: Date.now().toString(),
            ...payload,
            key: `chat_${payload.idGroup}_${Date.now()}`,
            timestamp: Date.now(),
        };
        // Simpan ke AsyncStorage
        await persistNewMessage(newMessage);
        return newMessage;
    }
);

export const clearActiveChat = createAsyncThunk(
    'chat/clearActive',
    async () => {
        // Implementasi penghapusan chat jika diperlukan
        // Bisa menggunakan MMKV untuk menghapus item berdasarkan idGroup
    }
);

export const clearAllChats = createAsyncThunk(
    'chat/clearAll',
    async () => {
        // Implementasi penghapusan semua chat jika diperlukan
        // Bisa menggunakan MMKV untuk menghapus semua item yang terkait dengan chat
    }
);

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        groups: [] as Array<any>,
        chats: [] as Array<any>,
        status: StateStatus.IDLE,
    },
    reducers: {
        addMessage: (state, action: PayloadAction<any>) => {
            state.chats.unshift(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(hydrateChatGroups.pending, (state) => {
                state.status = StateStatus.LOADING;
            })
            .addCase(hydrateChatGroups.rejected, (state) => {
                state.status = StateStatus.FAILED;
            })
            .addCase(hydrateChatGroups.fulfilled, (state, action) => {
                state.groups = action.payload;
                state.status = StateStatus.SUCCESS;
            })
            .addCase(hydrateChatById.pending, (state) => {
                state.status = StateStatus.LOADING;
            })
            .addCase(hydrateChatById.rejected, (state) => {
                state.status = StateStatus.FAILED;
            })
            .addCase(hydrateChatById.fulfilled, (state, action) => {
                state.chats = action.payload;
                state.status = StateStatus.SUCCESS;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.chats.unshift(action.payload);
            });
    },
});
export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;