export enum ButtonType {
  default,
  signUp,
  continue,
}

export enum ButtonStyle {
  white,
  whiteOutline,
  black,
}

export enum AuthScope {
  email = 'email',
  fullName = 'full_name',
}

export interface ModuleConstants {
  authScopes: typeof AuthScope;
  buttonStyles: typeof ButtonStyle;
  buttonTypes: typeof ButtonType;
  isAvailable: boolean;
}

export interface PersonNameComponents {
  familyName?: String;
  givenName?: String;
  middleName?: String;
  namePrefix?: String;
  nameSuffix?: String;
  nickname?: String;
  phoneticRepresentation?: PersonNameComponents;
}

export type UserDetectionStatus = 'unknown' | 'unsopported' | 'likelyReal';

export interface AuthorizationCredentials {
  user: String;
  state?: String;
  authorizedScopes: [AuthScope];
  authorizationCode?: String;
  identityToken?: String;
  email?: String;
  fullName: PersonNameComponents;
  realUserStatus: UserDetectionStatus;
}

export interface AuthorizationError {
  code: 'ASAUTHORIZATION_ERROR';
  message: String;
}
