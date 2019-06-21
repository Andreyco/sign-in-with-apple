import { NativeModules } from 'react-native';
import { ModuleConstants, AuthScope } from './Types';

const RNSignInWithApple = NativeModules.RNSignInWithApple as {
  getConstants: () => ModuleConstants;
  authorize: Function;
};

export class SignInWithApple {
  static constants = RNSignInWithApple.getConstants();

  static async authorize(scopes: [AuthScope]) {
    try {
      const response = await RNSignInWithApple.authorize(scopes);
    } catch (e) {
      console.log(e);
    }
  }
}
