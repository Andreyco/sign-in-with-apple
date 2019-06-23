import React from 'react';
import {
  requireNativeComponent,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { SignInWithApple } from './SignInWithApple';
import { ButtonStyle, ButtonType, AuthScope } from './Types';

interface Props {
  buttonStyle: ButtonStyle;
  buttonType: ButtonType;
  scopes: [AuthScope];
  state?: String;
  style?: StyleProp<ViewStyle>;
}

export const SignInButton: React.FC<Props> = props => {
  function onPress() {
    SignInWithApple.authorize(props.scopes, props.state);
  }

  return SignInWithApple.constants.isAvailable ? (
    <NativeView
      buttonStyleRawValue={props.buttonStyle}
      buttonTypeRawValue={props.buttonType}
      onPress={onPress}
      style={[DEFAULT_APPLE_ID_BUTTON_STYLE, props.style]}
    />
  ) : (
    <StupButton />
  );
};

const StupButton: React.FC = () => (
  <View
    style={{
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: 'red',
      borderRadius: 8,
      paddingHorizontal: 20,
      paddingVertical: 10,
    }}
  >
    <Text style={{ color: 'red', textAlign: 'center' }}>
      "Sign in with Apple" is available on iOS&nbsp;13.0&nbsp;and&nbsp;newer
    </Text>
  </View>
);

const NativeView = requireNativeComponent('SingInButtonView');

const DEFAULT_APPLE_ID_BUTTON_STYLE = {
  minWidth: 100,
  height: 44,
  width: '100%',
};
