import * as React from 'react';
import { Dimensions, ImageBackground, View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
const {useState} = React
import HomeTabs from "../components/HomeTabs"
import Fire from "./Home/Fire"
import Typhoon from "./Home/Typhoon"
import Earthquake from "./Home/Earthquake"
import FirstAid from "./Home/FirstAid"
import Weather from "./Home/Weather"
import Emergency from "./Home/Emergency"

import { createStackNavigator } from '@react-navigation/stack';
import { Directions } from 'react-native-gesture-handler';

import { Avatar, Image, Icon, Button } from 'react-native-elements';

const Stack = createStackNavigator();


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HomeScreen({ navigation }) {
    return (
      <Stack.Navigator>
        <Stack.Screen 
        name="home" 
        component={Home} 
        options={{ 
            cardStyle:{backgroundColor: "white"},
            title: 'SafeZone',
            headerTitleAlign: 'center',
            headerLeft: () => (
                <Button
                  onPress={() => {navigation.openDrawer()}}
                  color="#fff"
                  buttonStyle={{backgroundColor: "transparent"}}
                  icon={{
                    name: "menu",
                    size: 30,
                    color: "white"
                  }}
                />
            ),
            headerStyle: {
                backgroundColor: '#fa6869',
                elevation: 0
            },
            headerTintColor: '#fff'
        }}
        />
        <Stack.Screen name="Fire" component={Fire} 
        options={{title: "",
        cardStyle:{backgroundColor: "white"},
        headerStyle:{elevation: 0}
        }}
        />
        <Stack.Screen name="Typhoon" component={Typhoon} 
        options={{title: "",
        cardStyle:{backgroundColor: "white"},
        headerStyle:{elevation: 0}
        }}
        />
        <Stack.Screen name="Earthquake" component={Earthquake} 
        options={{title: "",
        cardStyle:{backgroundColor: "white"},
        headerStyle:{elevation: 0}
        }}
        />
        <Stack.Screen name="First Aid Tips" component={FirstAid} 
        options={{
        title: "First Aid Tips",
        headerShown: false,
        cardStyle:{backgroundColor: "white"},
        headerStyle:{elevation: 0}
        }}
        />
        <Stack.Screen name="Weather Updates" component={Weather} 
        options={{title: "Weather Updates",
        cardStyle:{backgroundColor: "white"},
        headerStyle: {
            backgroundColor: '#fc5e5e',
            elevation: 0
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center'
        }}
        />
        <Stack.Screen name="Emergency Exit" component={Emergency} 
        options={{title: "Emergency Exit",
        cardStyle:{backgroundColor: "white"}
        }}
        />
      </Stack.Navigator>
    );
  }

  
function Home({ navigation }) {
    // const [buttonTabs, setButtonTabs] = useState(['Fire', 'Typhoon', 'Earthquake', 
    // 'First Aid Tips', 'Weather Updates', 'Emergency Exit'])
    
    const [buttonTabs, setButtonTabs] = useState([
        {name: "Fire", url: require("../assets/fireIcon.png") },
        {name: "Typhoon", url: require("../assets/typhoonIcon.png")},
        {name: "Earthquake", url: require("../assets/earthquakeIcon.png")},
        {name: "First Aid Tips", url: require("../assets/firstAidIcon.png")},
        {name: "Weather Updates", url: require("../assets/weatherUpdatesIcon.png")},
        {name: "Emergency Exit", url: require("../assets/emergencyIcon.png")}
    ])
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ScrollView>
            <ImageBackground 
            source={require("../assets/homeBG.png")} 
            style={styles.imageBG}
            >
                <View style={styles.container}>
                {
                buttonTabs.map((button, index)=>{
                    return(
                        <View 
                        style={styles.buttons}
                        key={index}>
                            
                            <TouchableOpacity
                            onPress={()=>{navigation.navigate(button.name)}}
                            style={styles.avatars}
                            >
                                <Image
                                source={button.url}
                                style={{ width: 130, height: 130, }}
                                resizeMode='cover'
                                />                           
                            </TouchableOpacity>

                            <Text style={{color: 'white', marginTop: -10}}>
                                {button.name}
                            </Text>
                        </View>

                        )
                    })
                }                
                </View>
            </ImageBackground>

            </ScrollView>

        </SafeAreaView>
        

    );
  }

  const styles = StyleSheet.create({
    container:{
        // backgroundColor: "pink",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 500,
        justifyContent: "space-around",
        marginTop: 10
    },
    buttons:{
        // backgroundColor: "blue",
        width: 150,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5
    },
    avatars:{
        width: 130,
        height: 130,
        // backgroundColor: 'red',
        overflow: 'hidden',
        borderRadius: 70
    },
    imageBG: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        height: windowHeight-100
      }
  })