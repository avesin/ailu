import { reduxStorage as storage } from '../../redux/storage';

export const persistNewMessage = async (message: any) => {
    const key = `chat_${message.idGroup}_${Date.now()}`;
    await storage.setItem(key, JSON.stringify(message));
};

export const getPersistedGroups = async () => {
    // 1. Ambil semua kunci
    const allKeys = await storage.getAllKeys();

    const latestMap = new Map<string, any>();

    allKeys.forEach(key => {
        const parts = key.split('_');
        const idGroup = parts[1];
        const timestamp = Number(parts[2]);

        const existingTime = latestMap.get(idGroup);
        if (!existingTime || timestamp > existingTime) {
            latestMap.set(idGroup, timestamp);
        }
    });

    const allData = await Promise.all(
        Array.from(latestMap.entries()).map(async ([idGroup, timestamp]) => {
            const key = `chat_${idGroup}_${timestamp}`;
            const data = await storage.getItem(key);
            if (!data) return null;

            const parsed = JSON.parse(data);
            return {
                ...parsed,
                id: idGroup,
                key: key, // Simpan key asli untuk keperluan delete/update nanti
                timestamp: parsed.timestamp || timestamp,
            };
        })
    );

    return allData
        .filter((item): item is any => item !== null)
        .sort((a, b) => a.timestamp - b.timestamp);
};


export const getPersistedChatsById = async (idGroup: string) => {
    const allKeys = await storage.getAllKeys();
    const filteredKeys = allKeys.filter(key => key.startsWith(`chat_${idGroup}_`));
    const chatDataArray = await Promise.all(
        filteredKeys.map(async (key) => {
            const data = await storage.getItem(key); // MMKV getString itu sync, tapi kita bungkus async agar seragam
            if (!data) return null;

            const parsed = JSON.parse(data);

            // Ambil timestamp dari key (opsional, jika di dalam data tidak ada timestamp)
            const timestamp = key.split('_').pop();

            return {
                ...parsed,
                id: idGroup,
                key: key, // Simpan key asli untuk keperluan delete/update nanti
                timestamp: parsed.timestamp || Number(timestamp),
            };
        })
    );

    return chatDataArray
        .filter((item): item is any => item !== null)
        .sort((a, b) => b.timestamp - a.timestamp);
};