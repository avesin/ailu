import { View } from "react-native";
import { useTheme } from "react-native-paper";

export default function CostumeView({ children, props, style }: { children: React.ReactNode, props?: any, style?: any }) {
    const theme = useTheme();

    return (
        <View style={[{ backgroundColor: theme.colors.background }, style]} {...props}>
            {children}
        </View>
    );
}