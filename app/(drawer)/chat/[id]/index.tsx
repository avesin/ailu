import CostumeView from '@/src/components/costume_view';
import { addMessage, hydrateChatById, hydrateChatGroups, sendMessage } from '@/src/features/chat/chat_slice';
import { sendPrompt } from '@/src/redux/llm_store';
import { AppDispatch, RootState } from '@/src/redux/store';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet } from 'react-native';
import { ActivityIndicator, IconButton, Modal, Surface, Text, TextInput, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

export default function ChatScreen() {
    const [text, setText] = useState('');
    const [visible, setVisible] = useState(false);
    const theme = useTheme();
    const { id } = useLocalSearchParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const messages = useSelector((state: RootState) => state.databaseChat.chats);
    const isLoading = useSelector((state: RootState) => state.databaseChat.status === 'loading');
    const { loading, response } = useSelector((state: RootState) => state.llm);
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        if (!loading && response) {
            const finalTime = Date.now();
            const aiMsg = {
                id: finalTime.toString(),
                idGroup: id as string,
                text: response,
                sender: 'ai' as const,
                key: `chat_${id}_${finalTime}`,
                timestamp: finalTime,
            };
            dispatch(addMessage(aiMsg));
        }
        flatListRef.current?.scrollToEnd({ animated: true });
        return () => {
            //   dispatch(clearActiveChat());
        };
    }, [response]);

    useEffect(() => {
        if (id) {
            dispatch(hydrateChatById(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        setTimeout(() => {
            flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
        }, 100);
    }, [messages]);


    if (isLoading) return <ActivityIndicator style={{ flex: 1 }} />;

    const handleSend = () => {
        if (!text.trim()) return;
        const payload = {
            idGroup: id as string,
            text: text,
            sender: 'user' as const
        };
        dispatch(sendMessage(payload));
        const messagesPrompt = [];
        var counterMessagees = [...messages];
        var totalLength = messages.length;
        console.log("Total messages before trimming 1:", counterMessagees.toString().length);
        while (counterMessagees.toString().length >= 300000 && totalLength > 0) {
            console.log("Total messages before trimming 2:", counterMessagees.toString().length);
            totalLength -= 1;
            counterMessagees = messages.slice(0, totalLength);
        }
        console.log("Total messages before trimming 3:", counterMessagees.toString().length);
        counterMessagees.slice(0, totalLength).forEach(msg => {
            messagesPrompt.unshift({
                role: msg.sender === 'user' ? 'user' : 'assistant',
                content: msg.text,
            });
        });
        messagesPrompt.push({
            role: 'user',
            content: text,
        });
        dispatch(sendPrompt({
            idgroup: id as string,
            messages: messagesPrompt,
        }));
        dispatch(hydrateChatGroups());
        setText('');
    };

    return (
        <CostumeView style={[styles.container]}>
            <KeyboardAvoidingView
                style={{ flexGrow: 1, justifyContent: 'flex-end' }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={90}
            >
                <CostumeView>
                    <FlatList
                        ref={flatListRef}
                        data={messages} // Tampilkan pesan terbaru di bawah
                        keyExtractor={(item) => item.key}
                        contentContainerStyle={styles.listContent}
                        inverted={true}
                        renderItem={({ item, index }) => (
                            <Pressable onLongPress={() => item.sender === 'user' && setVisible(true)}>
                                <CostumeView style={[
                                    styles.bubble,
                                    item.sender === 'user' ? styles.userBubble : styles.aiBubble
                                ]}>
                                    <Text style={{ color: item.sender === 'user' ? '#fff' : '#000' }}>
                                        {item.text}
                                    </Text>
                                    <Text style={styles.timestamp}>{item.time}</Text>
                                </CostumeView>
                            </Pressable>
                        )}
                    />
                    {loading && <Text>AI sedang mengetik...</Text>}
                    <Surface style={styles.inputWrapper} elevation={2}>
                        <TextInput
                            mode="flat"
                            placeholder="Tanya sesuatu..."
                            value={text}
                            onChangeText={setText}
                            multiline
                            style={styles.input}
                            underlineColor="transparent"
                            activeUnderlineColor="transparent"
                        />
                        <IconButton
                            icon="send"
                            mode="contained"
                            containerColor={theme.colors.primary}
                            iconColor="white"
                            disabled={!text.trim()}
                            onPress={handleSend}
                        />
                    </Surface>
                </CostumeView>
            </KeyboardAvoidingView>
            <Modal visible={visible} style={{ width: '100%', height: '80%', justifyContent: "center", alignItems: "center" }} onDismiss={() => setVisible(false)}>
                <CostumeView
                    style={{
                        alignItems: "center",
                        width: 200,
                        height: 60,
                        backgroundColor: "black",
                        padding: 20,
                        borderRadius: 10,
                    }}
                >
                    <Pressable style={{ height: 50, width: '100%' }} onPress={() => {
                        console.log("Edit message");
                    }}>
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20, textAlign: 'center' }}>EDIT</Text>
                    </Pressable>
                </CostumeView>
            </Modal>
        </CostumeView>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1 },
    listContent: { padding: 16, paddingBottom: 100, flexGrow: 1 },
    bubble: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 15,
        marginBottom: 10,
    },
    userBubble: {
        alignSelf: 'flex-end',
        backgroundColor: '#2196F3',
        borderBottomRightRadius: 2,
    },
    aiBubble: {
        alignSelf: 'flex-start',
        backgroundColor: '#E0E0E0',
        borderBottomLeftRadius: 2,
    },
    timestamp: {
        fontSize: 10,
        alignSelf: 'flex-end',
        marginTop: 4,
        opacity: 0.7,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4
    },
    input: {
        flex: 1,
        fontSize: 14,
        borderRadius: 20,
    },
});