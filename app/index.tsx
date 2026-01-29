import AnimatedIntro from "@/components/animated-intro";
import BottomLoginSheet from "@/components/bottom-login-sheet";
import { View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <AnimatedIntro />
      <BottomLoginSheet />
    </View>
  );
}
