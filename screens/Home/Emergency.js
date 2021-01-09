import * as React from 'react';
import { Dimensions, Button, View, Text, SafeAreaView, StyleSheet, ScrollViewBase } from 'react-native';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon, Image } from 'react-native-elements';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Emergency({ navigation }) {
    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>


          <View style={{width: windowWidth, height: windowHeight, position: "relative"}}>
            <ReactNativeZoomableView
            maxZoom={3}
            minZoom={1}
            zoomStep={0.5}
            initialZoom={1}
            bindToBorders={true}
            captureEvent={true}
            style={{
                // backgroundColor: 'red',
            }}
            >
            <Image 
            style={{width: windowWidth, height:windowWidth}}
            source={require("../../assets/Map.png")} />
            </ReactNativeZoomableView>
          </View> 

          <View style={styles.boxInfo}>
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <Icon
                reverse
                name='arrow-back-outline'
                type='ionicon'
                color="transparent"
                iconStyle={{color: "red"}}
              />
              <Text style={{color: "#575757"}}>Exit Symbol</Text>
            </View>

            
          </View>
      </SafeAreaView>
      
    );
}

const styles = StyleSheet.create({
  boxInfo:{
    backgroundColor: "#f0f0f0",
    width: 170,
    height: 65,
    position: "absolute",
    bottom: 10,
    right: 10,
    borderRadius: 30,
    opacity: 0.7
  }
})