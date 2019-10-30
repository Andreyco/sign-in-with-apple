//
//  RNSignInButtonViewManager.m
//  SignInWithApple
//
//  Created by Andrej on 19/06/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(SingInButtonViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(buttonTypeRawValue, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(buttonStyleRawValue, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(cornerRadius, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(onPress, RCTBubblingEventBlock)

@end
