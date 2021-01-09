import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'
import { Dimensions, View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import {Icon, ListItem} from 'react-native-elements'
const {useState} = React



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Burn({ route, navigation }) {
    const {name, tips} = route.params
    return (

      <LinearGradient
      colors={['#fef9f9', '#f9cbcb']}
      style={{width: windowWidth, height: windowHeight}}
      start={{x: 0, y:0.5}}
      end={{x: 0.5, y: 0.7}}
      >  
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ScrollView>
              <View style={styles.container}>     

                {
                  tips.map((tip, index)=>(
                    <ListItem 
                    key={index}  
                    style={{width:"100%", paddingLeft: 20, paddingRight: 20,}}
                    containerStyle={{backgroundColor: "transparent"}}
                    >
                        
                        <ListItem.Content style={{flexDirection: "row", justifyContent: "space-between", }}>
                          <Icon name="circle" color="#fe5252"  size={10} style={{marginTop: 5}} />

                          <View style={{width: "88%"}}>
                            <Text style={{fontWeight: "bold", color: "#707070", fontSize:16}}>
                              {tip.title+". "}
                              <Text style={{fontWeight: "normal", color: "grey", fontSize:16}}>
                                {tip.body} 
                              </Text>
                            </Text>

                          </View>

                        </ListItem.Content>
                    </ListItem>

                  ))
                }
                
              </View>
            </ScrollView>

        </SafeAreaView>
        </LinearGradient>

    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        marginBottom: 150
        
    }
  })