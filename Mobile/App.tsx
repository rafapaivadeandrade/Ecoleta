import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {Roboto_400Regular, Roboto_500Medium} from '@expo-google-fonts/roboto';
import {AppLoading} from 'expo'
import {Ubuntu_700Bold, useFonts} from '@expo-google-fonts/ubuntu'
import Home from '../mobile/src/pages/Home'
import Routes from './src/routes';
export default function App() {

  const[fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  })

  if(!fontsLoaded){
    return <AppLoading/>
  }

  return (
      <>
      <StatusBar  barStyle="dark-content" backgroundColor="transparent"/>
      <Routes/>

      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
