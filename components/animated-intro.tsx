
import { COLORS } from "@/constants/colors";
import { memo } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { ReText } from "react-native-redash";

const content = [
  {
    title: "Let's create.",
    bg: COLORS.lime,
    fontColor: COLORS.pink,
  },
  {
    title: "Let's brainstorm.",
    bg: COLORS.brown,
    fontColor: COLORS.sky,
  },
  {
    title: "Let's discover.",
    bg: COLORS.orange,
    fontColor: COLORS.blue,
  },
  {
    title: "Let's go.",
    bg: COLORS.teal,
    fontColor: COLORS.yellow,
  },
  {
    title: "ChatGPT.",
    bg: COLORS.green,
    fontColor: COLORS.pink,
  },
];

const AnimatedIntro = () => {
  const { width } = useWindowDimensions();
  const ballWidth = 34;
  const half = width / 2 - ballWidth / 2;

  const currentX = useSharedValue(half);
  const currentIndex = useSharedValue(0);
  const isAtStart = useSharedValue(true);
  const labelWidth = useSharedValue(0);
  const canGoToNext = useSharedValue(false);
  const didPlay = useSharedValue(false);

  const newColorIndex = useDerivedValue(() => {
    if (!isAtStart.value) {
      return (currentIndex.value + 1) % content.length;
    }
    return currentIndex.value;
  }, [currentIndex]);

  const textStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        currentX.value,
        [half, half + labelWidth.value / 2],
        [
          content[newColorIndex.value].fontColor,
          content[currentIndex.value].fontColor,
        ],
        "RGB"
      ),
      transform: [
        {
          translateX: interpolate(
            currentX.value,
            [half, half + labelWidth.value / 2],
            [half + 4, half - labelWidth.value / 2]
          ),
        },
      ],
    };
  }, [currentIndex, currentX]);

  const ballStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        currentX.value,
        [half, half + labelWidth.value / 2],
        [
          content[newColorIndex.value].fontColor,
          content[currentIndex.value].fontColor,
        ],
        "RGB"
      ),
      transform: [{ translateX: currentX.value }],
    };
  });

  const mask = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(
        currentX.value,
        [half, half + labelWidth.value / 2],
        [content[newColorIndex.value].bg, content[currentIndex.value].bg],
        "RGB"
      ),
      transform: [{ translateX: currentX.value }],
      width: width / 1.5,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
    }),
    [currentIndex, currentX, labelWidth]
  );

  const style1 = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      currentX.value,
      [half, half + labelWidth.value / 2],
      [content[newColorIndex.value].bg, content[currentIndex.value].bg],
      "RGB"
    ),
    opacity: interpolate(1, [1, 0], [1, 0, 0, 0, 0, 0, 0]),
    transform: [
      {
        translateX: interpolate(
          1,
          [1, 0],
          [0, -width * 2, -width, -width, -width, -width, -width]
        ),
      },
    ],
  }));

  const text = useDerivedValue(() => {
    const index = currentIndex.value;
    return content[index].title;
  }, [currentIndex]);

  useAnimatedReaction(
    () => labelWidth.value,
    (newWidth) => {
      if (newWidth > 0) {
        currentX.value = withDelay(
          1000,
          withTiming(
            half + newWidth / 2,
            {
              duration: 800,
            },
            (finished) => {
              if (finished) {
                canGoToNext.value = true;
                isAtStart.value = false;
                didPlay.value = true;
              }
            }
          )
        );
      }
    },
    [labelWidth, currentX, half]
  );

  useAnimatedReaction(
    () => canGoToNext.value,
    (next) => {
      if (next) {
        canGoToNext.value = false;
        currentX.value = withDelay(
          1000,
          withTiming(
            half,
            {
              duration: 800,
            },
            (finished) => {
              if (finished) {
                currentIndex.value = (currentIndex.value + 1) % content.length;
                isAtStart.value = true;
                // Keep didPlay as true so the animation can restart infinitely
              }
            }
          )
        );
      }
    },
    [currentX, labelWidth]
  );

  useAnimatedReaction(
    () => [isAtStart.value, labelWidth.value, didPlay.value] as const,
    ([atStart, width, played]) => {
      // Only restart if we're at start, have a valid width, and have played at least once
      // This prevents firing on initial mount before the first animation
      // We check didPlay to ensure we've completed at least one full cycle
      if (atStart && width > 0 && played) {
        // Trigger the next animation cycle
        currentX.value = withDelay(
          1000,
          withTiming(
            half + width / 2,
            {
              duration: 800,
            },
            (finished) => {
              if (finished) {
                canGoToNext.value = true;
                isAtStart.value = false;
                didPlay.value = true;
              }
            }
          )
        );
      }
    },
    [currentX, labelWidth, half]
  );

  return (
    <Animated.View style={[styles.wrapper, style1]}>
      <Animated.View style={[styles.content]}>
        <Animated.View style={[styles.ball, ballStyle]} />
        <Animated.View style={[styles.mask, mask]} />
        <ReText
          onLayout={(e) => {
            labelWidth.value = e.nativeEvent.layout.width + 4;
          }}
          style={[styles.title, textStyle]}
          text={text}
        />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  mask: {
    zIndex: 1,
    position: "absolute",
    left: "0%",
    height: 44,
  },
  ball: {
    width: 40,
    zIndex: 10,
    height: 40,
    backgroundColor: "#000",
    borderRadius: 20,
    position: "absolute",
    left: "0%",
  },
  titleText: {
    flexDirection: "row",
  },
  title: {
    fontSize: 36,
    fontWeight: "600",
    left: "0%",
    position: "absolute",
  },
  content: {
    marginTop: 300,
  },
});
export default memo(AnimatedIntro);
