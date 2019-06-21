//
//  SignInButtonViewManager.swift
//  SignInWithApple
//
//  Created by Andrej on 17/06/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import AuthenticationServices

@available(iOS 13.0, *)
@objc(SingInButtonViewManager)
class SingInButtonViewManager: RCTViewManager {
  
  var innerView: AppleIDButtonView?;
 
  @objc override static func requiresMainQueueSetup() -> Bool {
    return false;
  }
  
  @objc override func view() -> AppleIDButtonView? {
    innerView = AppleIDButtonView();
    innerView?.appleIDButtonDelegate = self;
    return innerView;
  }

}

@available(iOS 13.0, *)
extension SingInButtonViewManager: AppleIDButtonDelegate {

  func buttonWasPressed(button: ASAuthorizationAppleIDButton) -> Void {
    self.innerView!.onPress!(nil);
  }
  
}
