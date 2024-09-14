import { View, Text, Image } from 'react-native'
import React from 'react'
import Animated, { FadeInRight, interpolate, interpolateColor, runOnJS, SharedValue, useAnimatedStyle, useDerivedValue, useSharedValue, withDelay, withSpring } from 'react-native-reanimated'

const users = [
    { name: "Alice", score: 20 },
    { name: "Bob", score: 32 },
    { name: "Charlie", score: 54 },
    { name: "Catalin", score: 15 },
    { name: "Adam", score: 38 },
    { name: "David", score: 31 },
    { name: "Eve", score: 41 },
]

type PlaceProps = {
    user: (typeof users)[0],
    index: number;
    onFinished?: () => void;
    anim: SharedValue<number>
}

const _avatorSize = 35;
const _spacing = 4;
const _stagger = 250;

function Place({ user, index, onFinished, anim }: PlaceProps) {

    const _anim = useDerivedValue(() => {
        return withDelay(
            _stagger * index,
            withSpring(anim.value, {
                damping: 80,
                stiffness: 200
            })
        )
    })

    const style = useAnimatedStyle(() => {
        return {
            // height: user.score * 3 * _anim.value
            height: interpolate(_anim.value, [0, 1], [_avatorSize, Math.max(user.score * 3, _avatorSize)]),
            backgroundColor: index === 4 ? interpolateColor(
                _anim.value,
                [0, 1],
                ["rgba(0,0,0,0.1)", "turquoise"]
            ) : "rgba(0,0,0,0.1)"
        }
    })

    const textStylez = useAnimatedStyle(() => {
        return {
            opacity: interpolate(_anim.value, [0, 0.2, 1], [0, 0, 1])
        }
    })

    return (
        <Animated.View
            style={{ alignItems: 'center' }}
            entering={FadeInRight.delay(
                _stagger * index * 1.8
                // 1000                                -> springify() -- suttle vibration
            ).springify().withCallback(finished => { // it calls when finish of the last item.
                if (finished && onFinished) {
                    runOnJS(onFinished)() // (runOnJS) -> In UI tread function calls not working, we need Javascript to run functions. 
                }
            }) //.damping(80).stiffness(200)


            }>
            <Animated.Text style={[{}, textStylez]}>{user.score}</Animated.Text>
            <Animated.View
                style={[{
                    // width: _avatorSize,
                    // height: _avatorSize,
                    borderRadius: _avatorSize
                },
                    style
                ]}
            >
                <View
                    style={{
                        width: _avatorSize,
                        aspectRatio: 1
                    }}
                >
                    <Image
                        source={{ uri: `https://avatar.iran.liara.run/public/${index + 30}` }}
                        style={{
                            flex: 1,
                            borderRadius: _avatorSize
                        }}
                    />
                </View>
            </Animated.View>
        </Animated.View>
    )
}

const LeaderBoard = () => {
    const _anim = useSharedValue(0)
    return (
        <View style={{
            flexDirection: 'row', gap: _spacing,
            // backgroundColor: 'green',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            height: 130
        }}>
            {users.map((user, index) => (
                <Place key={index} user={user} index={index}
                    anim={_anim}
                    onFinished={
                        index === users.length - 1
                            ? () => {
                                console.log("has finished:", index)
                                _anim.value = 1
                            } : undefined
                    }
                />
            )
            )}
        </View>
    )
}

export default LeaderBoard