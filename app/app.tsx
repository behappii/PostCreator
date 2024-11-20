import * as React from 'react'
import Index from './(tabs)';
import { createStackNavigator } from '@react-navigation/stack';
import Post from './post';

const Stack = createStackNavigator();

export default function App() {
    return (
        <Stack.Navigator>
            <Stack.Screen name = '(tabs)/index' component = { Index }/>
            <Stack.Screen name = 'post' component = { Post }/>
        </Stack.Navigator>
    )
}