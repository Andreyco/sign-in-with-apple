//
//  ButtonView.swift
//  SignInWithApple
//
//  Created by Andrej on 18/06/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import AuthenticationServices

@available(iOS 13.0, *)
@objc(AppleIDButtonView)
class AppleIDButtonView: UIView {
    
    weak var appleIDButtonDelegate: AppleIDButtonDelegate?;
    
    lazy private var appleIDButton: ASAuthorizationAppleIDButton = initAuthorizationAppleIDButton();
    
    @objc var buttonTypeRawValue: Int = ButtonType.default.rawValue {
        didSet {
            reinitAuthorizationAppleIDButton();
        }
    }
    
    @objc var buttonStyleRawValue: Int = ButtonStyle.black.rawValue {
        didSet {
            reinitAuthorizationAppleIDButton();
        }
    }

    @objc var cornerRadius: CGFloat = 0 {
        didSet {
            appleIDButton.cornerRadius = cornerRadius;
        }
    }
    
    @objc var onPress: RCTBubblingEventBlock?
    
    override init(frame: CGRect) {
        super.init(frame: frame);
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder);
    }
    
    override func layoutSubviews() {
        super.layoutSubviews();
        appleIDButton.frame = self.bounds;
    }
    
    private func initAuthorizationAppleIDButton() -> ASAuthorizationAppleIDButton {
        let buttonType: ButtonType = ButtonType(rawValue: buttonTypeRawValue) ?? ButtonType.default;
        let buttonStyle: ButtonStyle = ButtonStyle(rawValue: buttonStyleRawValue) ?? ButtonStyle.black;
        let button = ASAuthorizationAppleIDButton(type: buttonType, style: buttonStyle);
        button.cornerRadius = cornerRadius;
        return button;
    }
    
    private func disposeAuthoriationAppleIDButton() {
        appleIDButton.removeTarget(self, action: #selector(handleAuthorizationAppleIDButtonPress), for: .allEvents);
        appleIDButton.removeFromSuperview();
    }
    
    private func reinitAuthorizationAppleIDButton() {
        disposeAuthoriationAppleIDButton();
        appleIDButton = initAuthorizationAppleIDButton();
        appleIDButton.addTarget(self, action: #selector(handleAuthorizationAppleIDButtonPress), for: .touchUpInside);
        self.addSubview(appleIDButton);
    }
    
    @objc private func handleAuthorizationAppleIDButtonPress(target: ASAuthorizationAppleIDButton) {
        appleIDButtonDelegate?.buttonWasPressed(button: appleIDButton);
    }
}
