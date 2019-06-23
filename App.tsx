/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import './SignInWithApple';
import { SignInButton } from './SignInWithAppleButton';
import { ButtonStyle, ButtonType, AuthScope } from './Types';

interface Props {}

export const App: React.FC<Props> = () => {
  const [buttonType, setButtonType] = React.useState(ButtonType.default);
  const [buttonStyle, setButtonStyle] = React.useState(ButtonStyle.black);

  return (
    <View style={styles.container}>
      <SignInButton
        buttonStyle={buttonStyle}
        buttonType={buttonType}
        scopes={[AuthScope.email, AuthScope.fullName]}
        state="state to pass"
      />
      <Text onPress={() => setButtonType(ButtonType.default)}>Default</Text>
      <Text onPress={() => setButtonType(ButtonType.signUp)}>Sign up</Text>
      <Text onPress={() => setButtonType(ButtonType.continue)}>Continue</Text>
      <Text onPress={() => setButtonStyle(ButtonStyle.black)}>Black</Text>
      <Text onPress={() => setButtonStyle(ButtonStyle.white)}>White</Text>
      <Text onPress={() => setButtonStyle(ButtonStyle.whiteOutline)}>
        White outline
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
