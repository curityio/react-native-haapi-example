//
//  HaapiModule.m
//  HaapiModule
//
//  Created by Daniel Lindau on 2023-12-28.
//


#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(NetworkStatus, RCTEventEmitter)

RCT_EXTERN_METHOD(start)

@end

