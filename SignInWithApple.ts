import { NativeModules } from 'react-native';
import { ModuleConstants, AuthScope, PersonNameComponents } from './Types';

const RNSignInWithApple = NativeModules.RNSignInWithApple as {
  getConstants: () => ModuleConstants;
  // TODO add typing
  authorize: Function;
};

export class SignInWithApple {
  static constants = RNSignInWithApple.getConstants();

  static async authorize(scopes: [AuthScope], state?: String) {
    try {
      const [rawResponse] = await RNSignInWithApple.authorize(scopes, state);
      const response = stripNullPersonNameComponents(rawResponse);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }
}

// TODO implement
function stripNullPersonNameComponents(
  nameComponents: PersonNameComponents
): PersonNameComponents {
  return nameComponents;
}
