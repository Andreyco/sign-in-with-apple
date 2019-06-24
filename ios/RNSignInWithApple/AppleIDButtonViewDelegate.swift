//
//  AppleIDButtonViewDelegate.swift
//  SignInWithApple
//
//  Created by Andrej on 19/06/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import AuthenticationServices

@available(iOS 13.0, *)
protocol AppleIDButtonDelegate: NSObjectProtocol {
    
    func buttonWasPressed(button: ASAuthorizationAppleIDButton);
    
}
