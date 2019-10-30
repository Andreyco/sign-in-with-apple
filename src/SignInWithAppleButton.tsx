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
import {
  ButtonStyle,
  ButtonType,
  AuthScope,
  AuthorizationCredentials,
  AuthorizationError,
} from './Types';

export interface SignInButtonProps {
  buttonStyle: ButtonStyle;
  buttonType: ButtonType;
  cornerRadius: number;
  scopes: [AuthScope];
  state?: String;
  style?: StyleProp<ViewStyle>;
  onAuthorizationSuccess: (credentials: AuthorizationCredentials) => void;
  onAuthorizationError: (error: AuthorizationError) => void;
}

export const SignInButton: React.FC<SignInButtonProps> = props => {
  async function onPress() {
    try {
      const [response] = await SignInWithApple.authorize(
        props.scopes,
        props.state
      );
      props.onAuthorizationSuccess(response);
    } catch (e) {
      props.onAuthorizationError(e);
    }
  }

  return SignInWithApple.constants.isAvailable ? (
    <NativeView
      buttonStyleRawValue={props.buttonStyle}
      buttonTypeRawValue={props.buttonType}
      cornerRadius={props.cornerRadius}
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
