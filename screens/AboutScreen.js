import * as React from 'react';
import { View, Text } from 'react-native';
const {useState} = React
import { Icon, Button } from 'react-native-elements';


import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default function About({ navigation }) {
    return (
      <Stack.Navigator>
        <Stack.Screen 
        name="Emergency" 
        component={AboutStack} 
        options={{ 
            title: 'About',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <Button
              onPress={() => {navigation.openDrawer()}}
              color="#fff"
              buttonStyle={{backgroundColor: "transparent"}}
              icon={{
                name: "menu",
                size: 30,
                color: "grey"
              }}
            />
            ),
        }}
        />
      </Stack.Navigator>
    );
  }

function AboutStack({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <Text>This is AboutStack</Text>
        
      </View>
    );
}