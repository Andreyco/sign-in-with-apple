//
//  RNSignInWithApple.m
//  SignInWithApple
//
//  Created by Andrej on 16/06/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNSignInWithApple, NSObject)

RCT_EXTERN_METHOD(authorize:(NSArray)scopes resolver: (RCTPromiseResolveBlock)resolve rejecter: (RCTPromiseRejectBlock)reject)

@end
