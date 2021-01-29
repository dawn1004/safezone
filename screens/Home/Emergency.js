import * as React from 'react';
import { Dimensions, Button, View, Text, SafeAreaView, StyleSheet, ScrollViewBase } from 'react-native';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon, Image } from 'react-native-elements';
const {useState, useEffect} = React
import * as firebase from 'firebase'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Emergency({ navigation }) {
    const [image, setImage] = useState(null);
    let imageLocRef = firebase.database().ref("/imageloc")

    useEffect(() => {
      imageLocRef.once('value', function(snapshot) {
        const imageObject = snapshot.val()
        for(let id in imageObject){
          setImage(imageObject[id].url)
          return
        }
      });
    })

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
              {
                image==null?
                (<></>):
                (<Image 
                  style={{width: windowWidth, height:windowWidth}}
                  source={{uri: image}} />)
              }
            </ReactNativeZoomableView>
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