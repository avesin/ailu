import CustomDrawer from '@/src/components/custom_drawer';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { useTheme } from 'react-native-paper';

export default function DrawerLayout() {
  const theme = useTheme();
  
  return (
    <Drawer
      initialRouteName="setting"
      drawerContent={(props: DrawerContentComponentProps) => <CustomDrawer />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: theme.colors.surface,
          width: 280,
        },
        sceneStyle: { backgroundColor: theme.colors.background },
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.primary,
      }}
    >
      <Drawer.Screen name="setting" options={{ title: 'Settings' }} />
      <Drawer.Screen name="chat/[id]" options={{ title: 'Chat' }} />
    </Drawer>
  );
}