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
