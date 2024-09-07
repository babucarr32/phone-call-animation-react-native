import { StyleSheet, View } from 'react-native';

import * as React from "react"
import Svg, { Path } from "react-native-svg"
import type { SvgProps } from "react-native-svg"
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle, useSharedValue, withDecay, withDelay, withRepeat, withTiming } from 'react-native-reanimated';

const PADDING = 20
const SIZES = [150, 200, 250]
const OPACITY = [1, .8, .4]
const Z_INDEX = [30, 20, 10]

const PhoneIcon = (props: SvgProps) => (
  <Svg
    fill="none"
    stroke="#000"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    width={40}
    height={40}
    {...props}
  >
    <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 22 16.92M14.05 2a9 9 0 0 1 8 7.94m-8-3.94A5 5 0 0 1 18 10" />
  </Svg>
)

 const Wave = ({index}: {index: number}) => {
  const size = useSharedValue(0)

  React.useEffect(() => {
    const DELAY = 100 * index

    size.value = withDelay(
      DELAY,
      withRepeat(withTiming(SIZES[index], {duration: 1000}), -1, false)
    )
  }, [])

  const animation = useAnimatedStyle(() => ({
    width: size.value,
    height: size.value,
    borderRadius: size.value /2,
    opacity: OPACITY[index],
    zIndex: Z_INDEX[index]
  }))

  return (
    <Animated.View style={[styles.wave, animation]} />
  )
 }

export default function HomeScreen() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.phoneContainer}>
          <View style={styles.phone}>
            <PhoneIcon />
          </View>
            {
              Array.from({length: 3}).map((_, index) => <Wave key={index} index={index} />)
            }
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  phoneContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  phone: {
    padding: PADDING,
    backgroundColor: 'cyan',
    borderRadius: 100,
    position: 'relative',
    zIndex: 100
  },
  wave: {
    backgroundColor: 'black',
    position: 'absolute',
    borderRadius: 100,
    zIndex: -20
  }
});
