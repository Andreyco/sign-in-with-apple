/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  AuthScope,
  ButtonStyle,
  ButtonType,
  SignInButton,
} from 'sign-in-with-apple';

interface Props {}
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <SignInButton
          scopes={[AuthScope.email, AuthScope.fullName]}
          buttonStyle={ButtonStyle.black}
          buttonType={ButtonType.signUp}
          onAuthorizationSuccess={credentials => {
            console.log(credentials);
          }}
          onAuthorizationError={error => {
            console.log(error);
          }}
          style={{ maxWidth: 300 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
