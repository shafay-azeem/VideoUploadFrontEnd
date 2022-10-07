import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UploadList from './components/UploadList';
import UploadForm from './components/UploadForm';
import axios from 'axios';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="UploadForm"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="UploadList" component={UploadList} />
        <Stack.Screen name="UploadForm" component={UploadForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
