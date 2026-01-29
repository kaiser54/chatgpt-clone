import { COLORS } from "@/constants/colors";
import { defaultStyles } from "@/constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const BottomLoginSheet = () => {
  return (
    <View style={[styles.container]}>
      <Pressable
        style={({ pressed }) => [
          defaultStyles.btn,
          styles.btnLight,
          {
            opacity: pressed ? 0.8 : 1,
          },
        ]}
      >
        <Ionicons name="logo-apple" size={20} style={styles.btnIcon} />
        <Text style={styles.btnLightText}>Continue with Apple</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          defaultStyles.btn,
          styles.btnDark,
          {
            opacity: pressed ? 0.8 : 1,
          },
        ]}
      >
        <Ionicons
          name="logo-google"
          size={16}
          style={styles.btnIcon}
          color={COLORS.light}
        />
        <Text style={styles.btnDarkText}>Continue with Google</Text>
      </Pressable>

      <Link href={{
        pathname: '/login',
        params: {
          type: 'register',
        },
      }} asChild>
        <Pressable>
          {({ pressed }) => (
            <View
              style={[
                defaultStyles.btn,
                styles.btnDark,
                {
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Ionicons
                name="mail"
                size={20}
                style={styles.btnIcon}
                color={COLORS.light}
              />
              <Text style={styles.btnDarkText}>Continue with Email</Text>
            </View>
          )}
        </Pressable>
      </Link>

      <Link href={{
        pathname: '/login',
        params: {
          type: 'login',
        },
      }} asChild>
        <Pressable>
          {({ pressed }) => (
            <View
              style={[
                defaultStyles.btn,
                styles.btnOutline,
                {
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text style={styles.btnDarkText}>Login</Text>
            </View>
          )}
        </Pressable>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#000",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 26,
    gap: 14,
  },
  btnLight: {
    backgroundColor: "#fff",
  },
  btnLightText: {
    color: "#000",
    fontSize: 20,
  },
  btnDark: {
    backgroundColor: COLORS.grey,
  },
  btnDarkText: {
    color: "#fff",
    fontSize: 20,
  },
  btnOutline: {
    borderWidth: 3,
    borderColor: COLORS.grey,
  },
  btnIcon: {
    paddingRight: 6,
  },
});
export default BottomLoginSheet;
