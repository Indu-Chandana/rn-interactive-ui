import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Swipeable } from 'react-native-gesture-handler';

const SwipeEffects = () => {

    // list items
    const data = [
        { id: '1', text: 'Learning JavaScript basics for React Native.' },
        { id: '2', text: 'Integrating APIs in a React Native project.' },
        { id: '3', text: 'Optimizing performance in React Native apps.' },
    ];

    const ListItem = ({ item }: { item: { id: string, text: string } }) => {

        const renderActions = () => (
            <View style={{ flexDirection: 'row', marginBottom: 2 }}>
                <TouchableOpacity style={{ height: "100%", width: 80, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffab00' }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ height: "100%", width: 80, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ff1744' }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>Delete</Text>
                </TouchableOpacity>
            </View>
        )

        return (
            <Swipeable renderRightActions={renderActions}>
                <View style={{ backgroundColor: '#884ea0', marginBottom: 2, padding: 20 }}>
                    <Text style={{ fontSize: 15, color: 'white', fontWeight: 400 }}>{item.text}</Text>
                </View>
            </Swipeable>
        )
    }

    return (
        <View style={{}}>
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <ListItem item={item} />}
                contentContainerStyle={{ marginVertical: 30 }}
            />
        </View>
    )
}

export default SwipeEffects