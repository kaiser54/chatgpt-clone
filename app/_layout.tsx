import { COLORS } from "@/constants/colors";
import { defaultStyles } from "@/constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function RootLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="login"
        options={{
          headerShadowVisible: false,
          presentation: "modal",
          title: "",
          headerRight: () => (
            <Pressable
              style={defaultStyles.iconBtn}
              onPress={() => router.back()}
            >
              {({ pressed }) => (
                <Ionicons
                  name="close-outline"
                  style={[{ textAlign: "center", margin: 0 }]}
                  color={pressed ? COLORS.grey : "black"}
                  size={28}
                />
              )}
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
