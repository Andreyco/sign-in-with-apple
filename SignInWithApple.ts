import { NativeModules } from 'react-native';
import { ModuleConstants, AuthScope } from './Types';

const RNSignInWithApple = NativeModules.RNSignInWithApple as {
  getConstants: () => ModuleConstants;
  // TODO add response typing
  authorize(scopes: [AuthScope], state?: String): Promise<any>;
};

export class SignInWithApple {
  static constants = RNSignInWithApple.getConstants();

  static authorize(scopes: [AuthScope], state?: String) {
    return RNSignInWithApple.authorize(scopes, state);
  }
}
