import React from 'react'
import { View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
const {useState} = React


export default function Burn({ route, navigation }) {
    const {name, tips} = route.params
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ScrollView>
              <View style={styles.container}>       
                <Text>This is {name}</Text>       
              </View>
            </ScrollView>

        </SafeAreaView>
        

    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        // justifyContent: "space-around",
        marginTop: 10
    }
  })