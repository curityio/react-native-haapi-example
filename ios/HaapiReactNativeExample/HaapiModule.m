//
//  HaapiModule.m
//  HaapiModule
//
//  Created by Daniel Lindau on 2023-12-28.
//


#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(HaapiModule, RCTEventEmitter)

RCT_EXTERN_METHOD(start: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject )
RCT_EXTERN_METHOD(load: (NSDictionary *)configuration
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject )
RCT_EXTERN_METHOD(submitForm: (NSDictionary *)action
                  parameters: (NSDictionary *)parameters
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(navigate: (NSDictionary *)link
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject )
RCT_EXTERN_METHOD(refreshAccessToken: (NSString *)refreshToken
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject )
RCT_EXTERN_METHOD(logout: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
@end

