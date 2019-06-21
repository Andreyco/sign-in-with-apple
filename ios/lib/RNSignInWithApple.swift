//
//  RNSignInWithApple.swift
//  SignInWithApple
//
//  Created by Andrej on 16/06/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import AuthenticationServices

@objc(RNSignInWithApple)
class RNSignInWithApple: NSObject {
  
  var resolveAuthorizationRequest: RCTPromiseResolveBlock?;
  
  var rejectAuthorizationRequest: RCTPromiseRejectBlock?;
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false;
  }
  
  @objc
  func constantsToExport() -> [String: Any]! {
    var isAvailable = false;
    var authScopes: [String: String] = [:];
    var buttonTypes: [String: Int] = [:];
    var buttonStyles: [String: Int] = [:];
    
    if #available(iOS 13.0, *) {
      authScopes = [
        "fullName": ASAuthorization.Scope.fullName.rawValue,
        "email": ASAuthorization.Scope.email.rawValue,
      ];
      buttonStyles = [
        "black": ButtonStyle.black.rawValue,
        "white": ButtonStyle.white.rawValue,
        "whiteOutline": ButtonStyle.whiteOutline.rawValue,
      ];
      buttonTypes = [
        "default": ButtonType.default.rawValue,
        "continue": ButtonType.continue.rawValue,
        "signUp": ButtonType.signUp.rawValue,
      ];
      isAvailable = true;
    }
    
    return [
      "isAvailable": isAvailable,
      "authScopes": authScopes,
      "buttonTypes": buttonTypes,
      "buttonStyles": buttonStyles,
    ];
  }
  
}


@available(iOS 13.0, *)
extension RNSignInWithApple: ASAuthorizationControllerPresentationContextProviding {
  
  func presentationAnchor(for controller: ASAuthorizationController) -> ASPresentationAnchor {
    return RCTKeyWindow()!;
  }
  
}

@available(iOS 13.0, *)
extension RNSignInWithApple: ASAuthorizationControllerDelegate {
  
  @objc(authorize:resolver:rejecter:)
  func authorize(scopes: [String], resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
    resolveAuthorizationRequest = resolve;
    rejectAuthorizationRequest = reject;
    
    let request = ASAuthorizationAppleIDProvider().createRequest();
    request.requestedScopes = scopes.map({ rawValue in ASAuthorization.Scope(rawValue) });
    
    let authorizationController = ASAuthorizationController(authorizationRequests: [request]);
    authorizationController.delegate = self;
    authorizationController.presentationContextProvider = self;
    authorizationController.performRequests();
  }
  
  func authorizationController(controller: ASAuthorizationController, didCompleteWithError error: Error) {
    rejectAuthorizationRequest!("ASAUTHORIZATION_ERROR", error.localizedDescription, error);
    
  }
  
  func authorizationController(controller: ASAuthorizationController, didCompleteWithAuthorization authorization: ASAuthorization) {
    print(authorization);
  }
  
}
