//
//  RNSignInWithAppleHelpers.swift
//  SignInWithApple
//
//  Created by Andrej on 23/06/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import AuthenticationServices

@available(iOS 13.0, *)
extension RNSignInWithApple {
    func credentialToSerializable(_ authorizationCredential: ASAuthorizationCredential) -> [String: Any] {
        var dictionary = [:] as [String: Any];
        
        func personNameComponentsToSerializable(_ nameComponents: PersonNameComponents) -> Dictionary<String, Any>? {
            var result = [String: Any]()
            Mirror(reflecting: nameComponents).children.forEach { child in
                if let property = child.label {
                    result[property] = child.value
                    if property == "phoneticRepresentation" {
                        result["phoneticRepresentation"] = personNameComponentsToSerializable(child.value as! PersonNameComponents)
                    }
                }
            }
            return result.isEmpty ? nil : result;
        }
        
        func userDetectionStatusToSerializable(_ credential: ASAuthorizationAppleIDCredential) -> String {
            switch credential.realUserStatus {
            case .likelyReal:
                return "likelyReal";
            case .unsupported:
                return "unsupported";
            case .unknown:
                fallthrough;
            default:
                return "unknown";
            };
        }
        
        switch authorizationCredential {
        case let appleIDCredential as ASAuthorizationAppleIDCredential:
            dictionary["user"] = appleIDCredential.user;
            dictionary["authorizedScopes"] = appleIDCredential.authorizedScopes;
            dictionary["realUserStatus"] = userDetectionStatusToSerializable(appleIDCredential);
            dictionary["email"] = appleIDCredential.email;
            if let email = appleIDCredential.email {
                dictionary["email"] = email;
            }
            if let state = appleIDCredential.email {
                dictionary["state"] = state;
            }
            if let authorizationCode = appleIDCredential.authorizationCode {
                dictionary["authorizationCode"] = String(decoding: authorizationCode, as: UTF8.self);
            }
            if let identityToken = appleIDCredential.identityToken {
                dictionary["identityToken"] = String(decoding: identityToken, as: UTF8.self);
            }
            if let fullName = appleIDCredential.fullName {
                dictionary["fullName"] = personNameComponentsToSerializable(fullName);
            }
            return dictionary;
        default:
            return [:] as [String: Any];
        }
    }
}

