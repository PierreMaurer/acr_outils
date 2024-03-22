import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useKeepAwake} from  "expo-keep-awake";
import Reanimation from "./app/index";
import Choice from "./app/choice";
import { GluestackUIProvider, Text, Box } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config" // Optional if you want to use default theme

const Stack = createNativeStackNavigator();
const App = () => {
    useKeepAwake()
    return (
        <GluestackUIProvider config={config}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Choice"
                        component={Choice}
                        options={{title: 'Choice'}}
                    />
                    <Stack.Screen
                        name="Réanimation"
                        component={Reanimation}
                        options={{title: 'Reanimation'}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </GluestackUIProvider>
    );
};
export default App;
