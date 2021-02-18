import * as React from 'react';
import { Dimensions, View, Text, SafeAreaView, StyleSheet, Linking } from 'react-native';
const {useState, useEffect} = React
import { Icon, Button, Image } from 'react-native-elements';

import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import * as firebase from 'firebase'


const Stack = createStackNavigator();


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Emergency({ navigation }) {
    return (
      <Stack.Navigator>
        <Stack.Screen 
        name="Emergency" 
        component={EmergencyStack} 
        options={{ 
            title: 'Emergency Hotlines',
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

function EmergencyStack({ navigation }) {
    let contactsRef = firebase.database().ref("/contacts")
    const [contacts, setContacts] =useState([])

    useEffect(() => {
      contactsRef.once('value', function(snapshot) {
        const contactsObject = snapshot.val()
        let contactsList = [];
  
        for(let id in contactsObject){
          contactsList.push({ id, ...contactsObject[id]})
        }
        setContacts(contactsList)
        console.log(contacts)
      });
    }, [])

    const callLinkHandler = (contact)=>{
      Linking.openURL(`tel:${contact.split("/")[0]}`)
    }

    return (
      <LinearGradient
      colors={['#ff4950', '#fa6869']}
      style={{width: windowWidth, height: windowHeight}}
      start={{x: 0, y:0.5}}
      end={{x: 0.5, y: 0.7}}
      >  
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ScrollView>
            <View style={{width: windowWidth, alignItems: 'center'}}>
              {
                contacts.map(contact=>(
                  <TouchableOpacity onPress={()=>{callLinkHandler(contact.contact)}} key={contact.id}>
                    <View style={styles.cardu}>
                      <Text style={{...styles.defaulText, fontWeight: "bold",}}>{contact.name}: </Text>
                      <Text style={styles.defaulText}>{contact.contact}</Text>
                    </View>                    
                  </TouchableOpacity>

                ))
              }
            </View>
          </ScrollView>
          <Image 
          source={require('../assets/whiteBottom.png')}
          style={{width: windowWidth, height: 200,}}
          />
        </SafeAreaView>
      </LinearGradient>
    );
}


const styles = StyleSheet.create({
  cardu:{
    backgroundColor: "#fd8585",
    width: 300,
    paddingVertical: 10,
    borderRadius: 40,
    marginTop: 20
  },
  defaulText:{
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  }
})