/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  TouchableOpacity,
  Animated
} from 'react-native';
import httpServices from './src/utils/http.services';



const App: () => React$Node = () => {

  const [activate, setActivate] = useState(false)
  const [waitingState, setWaitingState] = useState(false)
  const [successState, setSuccessState] = useState(false)
  const [data, setData] = useState(null)


  const value = useState(new Animated.ValueXY({ x: 0, y: 0 }))[0];

  const waiting = useState(new Animated.ValueXY({ x: 0, y: 30 }))[0];
  const success = useState(new Animated.ValueXY({ x: 0, y: 60 }))[0];


  const ButtonClickCheckFunction = async () => {
    // Mock api call

    Animated.parallel([
      //First to scroll up the activate state
      Animated.timing(value, {
        toValue: { x: 0, y: -30 },
        duration: 400,
        useNativeDriver: false
      }).start(() => {
        setTimeout(() => {
          setActivate(true)
          setWaitingState(true)
        }, 2000)
      }),
      //This is to start next step
      Animated.timing(waiting, {
        toValue: { x: 0, y: 0 },
        duration: 1000,
        useNativeDriver: false
      }).start(() => {
        setTimeout(() => {
          setWaitingState(false)
          setSuccessState(true)
          Animated.timing(success, {
            toValue: { x: 0, y: 0 },
            duration: 1200,
            useNativeDriver: false
          }).start(() => {
          })
        }, 2000)
      })])

    const response = await httpServices.activate({
      title: 'foo',
      body: 'bar',
      userId: 1
    })


    if (response.status == 200) {
      setData(JSON.stringify(response))
      setActivate(true)
      setWaitingState(false)
      setSuccessState(true)
    }
  }


  return (
    <>
      <SafeAreaView>
        <View style={styles.body}>
          <Image
            style={styles.logo}
            source={require('./src/assets/rakbank-logo.jpg')}
          />


          {
            !activate &&
            (<TouchableOpacity
              style={styles.SubmitButtonStyle}
              activeOpacity={.5}
              onPress={ButtonClickCheckFunction}
            >
              <Animated.View style={value.getLayout()}>


                < Text style={styles.TextStyle}><Image style={styles.imgStyle} source={require('./src/assets/up-arrow.png')}></Image> SUBMIT </Text>


              </Animated.View>
            </TouchableOpacity>)}


          {
            waitingState && (<TouchableOpacity
              style={styles.SubmitButtonStyleWaiting}
              activeOpacity={.5}
              onPress={ButtonClickCheckFunction}
            >
              < Animated.View style={waiting.getLayout()}>


                <Text style={styles.waitingStyle}><Image style={styles.imgStyle} source={require('./src/assets/loading.gif')}></Image> Waiting </Text>

              </Animated.View>
            </TouchableOpacity>)
          }

          {

            successState && (<><Text>{data}</Text><TouchableOpacity
              style={styles.SubmitButtonStyleSuccess}
              activeOpacity={.5}
              onPress={ButtonClickCheckFunction}
            >
              < Animated.View style={success.getLayout()}>


                <Text style={styles.waitingStyle}><Image style={styles.imgStyle} source={require('./src/assets/done.png')}></Image> Success </Text>


              </Animated.View>
            </TouchableOpacity></>)

          }





        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({


  body: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 15
  },
  imgStyle: {
    width: 20,
    height: 20
  },
  SubmitButtonStyle: {
    marginTop: 50,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: '#203073',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#fff'
  },
  SubmitButtonStyleWaiting: {
    marginTop: 50,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: '#203073',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#fff'
  },
  SubmitButtonStyleSuccess: {
    marginTop: 50,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: 'green',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#fff'
  },
  TextStyle: {
    color: '#fff',
    height: 30
  },
  waitingStyle: {
    color: 'white',
    height: 30
  }


});

export default App;
