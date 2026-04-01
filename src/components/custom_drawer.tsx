// components/CustomDrawer.tsx
import { useRouter } from 'expo-router';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Drawer, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { StateStatus } from '../redux/constants';
import { AppDispatch, RootState } from '../redux/store';
import CostumeView from './costume_view';

const menuItems = [
  { label: 'New Chat', name: 'new-chat', icon: 'chat' },
  { label: 'Settings', name: 'setting', icon: 'cog' }
];

export default function CustomDrawer() {
  const [active, setActive] = React.useState('index');
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();


  const groups = useSelector((state: RootState) => state.databaseChat.groups);
  const isHydrated = useSelector((state: RootState) => state.databaseChat.status === StateStatus.SUCCESS);

  return (
    <CostumeView style={styles.container}>
      <Drawer.Section>
        {menuItems.map((item) => (
          <Drawer.Item
            key={item.name}
            label={item.label}
            icon={item.icon}
            active={active === item.name}
            onPress={() => {
              if (item.name === 'setting') {
                setActive(item.name);
                router.push('/setting' as any);
                return;
              }else{
                router.push(`/chat/${Date.now()}` as any);
              }
            }}
          />
        ))}
      </Drawer.Section>
      {/* Section History Chat (Dynamic dari Redux) */}
        <Drawer.Section title="Recent Chats">
          {!isHydrated ? (
            <Text style={styles.loadingText}>Loading chats...</Text>
          ) : groups.length === 0 ? (
            <Text style={styles.loadingText}>No recent chats</Text>
          ) : (
            groups.map((group) => (
              <Drawer.Item
                key={group.idGroup}
                label={`${group.text}`}
                icon="chat-outline"
                onPress={() => {
                  router.push(`/chat/${group.idGroup}` as any);
                }}
              />
            ))
          )}
        </Drawer.Section>
    </CostumeView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40 },
  header: { padding: 16, alignItems: 'center' },
  loadingText: { paddingHorizontal: 28, opacity: 0.5, fontSize: 12 }
});
