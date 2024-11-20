import * as React from 'react'
import Index from '.';
import { createStackNavigator } from '@react-navigation/stack';
import Post from './post';

export type RootStackParamList = {
    post: {id: string} | undefined;
    index: {} | undefined;
}

const Stack = createStackNavigator();

export default function App() {
    return (
        <Stack.Navigator >
            <Stack.Screen name = 'index' component = { Index }/>
            <Stack.Screen name = 'psot' component = { Post }/>
        </Stack.Navigator>
    )
}