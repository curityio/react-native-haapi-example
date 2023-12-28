//
//  HaapiModule.swift
//  HaapiModule
//
//  Created by Daniel Lindau on 2023-12-28.
//

import Foundation
import Network

@objc(HaapiModule)
class HaapiModule: RCTEventEmitter {

  override init() {
    super.init()
  }

  override func supportedEvents() -> [String]! {
    return ["HaapiError"]
  }

  @objc
  func start() {
    self.sendEvent(withName: "HaapiError", body: ["error": "HaapiError", "error_description": "Not Implemented"])
  }
  

  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
