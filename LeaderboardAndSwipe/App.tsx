import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import LeaderBoard from './LeaderBoard'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import SwipeEffects from './SwipeEffects'

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1, marginVertical: 300 }}>
      <SafeAreaView style={{ backgroundColor: "#fff", alignItems: 'center', justifyContent: 'center', }}>

        <LeaderBoard />
        <SwipeEffects />

      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default App