import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,

} from 'react-native/Libraries/NewAppScreen';
import {encKey, encPayload, genKeys, genSharedSecret} from './src/utils';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
const data ='KzGjIfLbihPj8axSv9/sPSZCrvkJ+8AokMjBR'
  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 400,
          }}>
          <TouchableOpacity
            onPress={() => encPayload()}
            style={{
              padding: 30,
              backgroundColor: Colors.black,
            }}>
            <Text>Enc Payload</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => encKey(data)}
            style={{
              backgroundColor: Colors.black,
              padding: 30,
            }}>
            <Text>Enc Key</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => genKeys()}
            style={{
              backgroundColor: Colors.black,
              padding: 30,
            }}>
            <Text>Generate Keys</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => genSharedSecret()}
            style={{
              backgroundColor: Colors.black,
              padding: 30,
            }}>
            <Text>Generate Shared Secret</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
