//
//  HaapiModule.swift
//  HaapiModule
//
//  Created by Daniel Lindau on 2023-12-28.
//

import Foundation
import IdsvrHaapiSdk

@objc(HaapiModule)
class HaapiModule: RCTEventEmitter {
  
  struct Promise {
    var resolve: RCTPromiseResolveBlock
        var reject: RCTPromiseRejectBlock
  }
  private var haapiManager: HaapiManager?
  private var oauthTokenManager: OAuthTokenManager?
  private var currentRepresentation: HaapiRepresentation?
  private var haapiConfiguration: HaapiConfiguration?
  
  override init() {
    super.init()
    HaapiLogger.followUpTags = DriverFollowUpTag.allCases + SdkFollowUpTag.allCases
  }
  
  override func supportedEvents() -> [String]! {
    return ["HaapiError", "AuthenticationStep", "PollingStep", "ContinueSameStep", 
            "TokenResponse","TokenResponseError", "SessionTimedOut", "AuthenticationSelectorStep",
            "IncorrectCredentials", "ProblemRepresentation", "StopPolling", "PollingStepResult"]
  }
  
  @objc(load:resolver:rejecter:)
  func load(configuration: Dictionary<String, Any>,
            resolver resolve: @escaping RCTPromiseResolveBlock,
            rejecter reject: @escaping RCTPromiseRejectBlock) {
    let promise = Promise(resolve: resolve, reject: reject)
    
    do {
       haapiConfiguration = try ConfigurationHelper.createHaapiConfiguration(data: configuration) 
       promise.resolve(true)
    } catch {
      rejectRequestWithError(description: "Could not configure module: \(error)", promise: promise)
    }
  }
  
   
  @objc(start:rejecter:)
  func start(resolver resolve: @escaping RCTPromiseResolveBlock,
             rejecter reject: @escaping RCTPromiseRejectBlock) {
  
    let promise = Promise(resolve: resolve, reject: reject)
    
    if(haapiConfiguration == nil) {
      rejectRequestWithError(description: "Configuration not created. Run load() on the module before starting a flow", promise: promise)
      return
    }
    
    do {
      haapiManager = try HaapiManager(haapiConfiguration: haapiConfiguration!)
      oauthTokenManager = OAuthTokenManager(oauthTokenConfiguration: haapiConfiguration!)
    } catch {
      rejectRequestWithError(description: "Failed to create haapi manager. Error: \(error)", promise: promise)
      return
    }
    
    haapiManager?.start(completionHandler: { haapiResult in self.processHaapiResult(haapiResult, promise: promise) })
  }
  
  @objc
  func submitForm(_ action: Dictionary<String, Any>,
                  parameters: Dictionary<String, Any>,
                resolver resolve: @escaping RCTPromiseResolveBlock,
                rejecter reject: @escaping RCTPromiseRejectBlock) {
    let promise = Promise(resolve: resolve, reject: reject)
    
    guard let model = action["model"] else {
      rejectRequestWithError(description: "", promise: promise)
     return
    }
    
    let jsonDecoder = JSONDecoder()
    do {
      let actionObject = try JSONSerialization.data(withJSONObject: model)
      let formActionModel = try jsonDecoder.decode(FormActionModel.self, from: actionObject)
      haapiManager?.submitForm(formActionModel, parameters: parameters, completionHandler: { haapiResult in self.processHaapiResult(haapiResult, promise: promise) })
    } catch {
      rejectRequestWithError(description: "Failed to construct form to submit: \(error)", promise: promise)
    }
  }
 
  @objc
  func navigate(_ linkMap: Dictionary<String, Any>, 
                resolver resolve: @escaping RCTPromiseResolveBlock,
                rejecter reject: @escaping RCTPromiseRejectBlock) {
    let jsonDecoder = JSONDecoder()
    
    var mutableLinkMap = linkMap
    // should be optional in SDK
    if(mutableLinkMap["rel"] == nil) {
      mutableLinkMap["rel"] = "link"
    }
    
    let promise = Promise(resolve: resolve, reject: reject)
    
    do {
      let linkObject = try JSONSerialization.data(withJSONObject: mutableLinkMap)
      let link = try jsonDecoder.decode(Link.self, from: linkObject)
      haapiManager?.followLink(link, completionHandler: { haapiResult in self.processHaapiResult(haapiResult, promise: promise) })
    } catch {
      rejectRequestWithError(description: "Failed to construct link: \(error)", promise: promise)
    }
  }
  
  @objc
  func refreshAccessToken(_ refreshToken: String,
                          resolver resolve: @escaping RCTPromiseResolveBlock,
                          rejecter reject: @escaping RCTPromiseRejectBlock) {
    let promise = Promise(resolve: resolve, reject: reject)
    oauthTokenManager?.refreshAccessToken(with: refreshToken, completionHandler: { tokenResponse in
      self.handle(tokenResponse: tokenResponse, promise: promise)
    })
  }
  
  @objc(logout:rejecter:)
  func logout(resolver resolve: RCTPromiseResolveBlock,
              rejecter reject: RCTPromiseRejectBlock) {
    haapiManager?.close()
    oauthTokenManager = nil
    resolve(true)
  }
  
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  private func processHaapiResult(_ haapiResult: HaapiResult, promise: Promise) {
    switch haapiResult {
    case .representation(let representation):
      process(haapiRepresentation: representation, promise: promise)
    case .problem(let problemRepresentation):
      process(problemRepresentation: problemRepresentation, promise: promise)
    case .error(let error):
      // TODO: Close haapiManager
      rejectRequestWithError(description: "Unknown error: " + error.localizedDescription, promise: promise)
    }
  }
  
  private func process(problemRepresentation: ProblemRepresentation, promise: Promise) {
    switch(problemRepresentation.type) {
    case .incorrectCredentialsProblem:
      sendHaapiEvent("IncorrectCredentials", body: problemRepresentation)
    case .sessionAndAccessTokenMismatchProblem:
      sendHaapiEvent("SessionTimedOut", body: problemRepresentation)
    default:
      sendHaapiEvent("ProblemRepresentation", body: problemRepresentation)
    }
  }
  
  private func process(haapiRepresentation: HaapiRepresentation, promise: Promise) { 
    switch(haapiRepresentation) {
    case is AuthenticatorSelectorStep:
      resolveRequest(eventName: "AuthenticationSelectorStep", body: haapiRepresentation, promise: promise)
    case is InteractiveFormStep:
      resolveRequest(eventName: "AuthenticationStep", body: haapiRepresentation, promise: promise)
    case is ContinueSameStep:
      resolveRequest(eventName: "ContinueSameStep", body: haapiRepresentation, promise: promise)
    case let step as OAuthAuthorizationResponseStep:
      handle(codeStep: step, promise: promise)
    case let step as PollingStep:
      handle(pollingStep: step, promise: promise)
    default:
      rejectRequestWithError(description: "Unknown step", promise: promise)
    }
  }
  
  private func handle(pollingStep: PollingStep,
                      promise: Promise) {
    sendHaapiEvent("PollingStep", body: pollingStep)
    
    switch(pollingStep.pollingProperties.status) {
    case .pending:
      resolveRequest(eventName: "PollingStepResult", body: pollingStep, promise: promise)
    case .failed:
      sendHaapiEvent("StopPolling", body: pollingStep)
      submitModel(model: pollingStep.mainAction.model, promise: promise)
    case .done:
      submitModel(model: pollingStep.mainAction.model, promise: promise)
    }
  }
  
  private func handle(tokenResponse: TokenResponse, promise: Promise) {
        switch(tokenResponse) {
        case .successfulToken(let successfulTokenResponse):
          let tokenResponse = self.mapTokenResponse(successfulTokenResponse)
          resolveRequest(eventName: "TokenResponse", body: tokenResponse, promise: promise)
        case .errorToken(let errorTokenResponse):
          // Request succeeded, but with contents indicating an. Resolve with contents, so that frontend can act on it.
          resolveRequest(eventName: "TokenErrorResponse", body: errorTokenResponse, promise: promise)
        case .error:
          self.sendHaapiError(description: "Failed to execute token request")
      }
  }
  
  private func submitModel(model: FormActionModel, 
                           promise: Promise) {
    haapiManager?.submitForm(model, parameters: [:], completionHandler: { haapiResult in
      self.processHaapiResult(haapiResult, promise: promise)
    })
  }

  private func handle(codeStep: OAuthAuthorizationResponseStep, promise: Promise) {
    oauthTokenManager?.fetchAccessToken(with: codeStep.oauthAuthorizationResponseProperties.code!, completionHandler: { tokenResponse in
        self.handle(tokenResponse: tokenResponse, promise: promise)
    })
  }
  
  private func mapTokenResponse(_ succesfulTokenResponse: SuccessfulTokenResponse) -> Dictionary<String, String> {
    var tokenResponse = ["accessToken": succesfulTokenResponse.accessToken]
    if (succesfulTokenResponse.idToken != nil) {
      tokenResponse["idToken"] = succesfulTokenResponse.idToken
    }
    if (succesfulTokenResponse.refreshToken != nil) {
      tokenResponse["refreshToken"] = succesfulTokenResponse.refreshToken
    }
    tokenResponse["scope"] = succesfulTokenResponse.scope ?? ""
    return tokenResponse
  }
  
  private func sendHaapiEvent(_ name: String, body: Codable) {
    do {
      let encodedBody = try encodeObject(body)
      self.sendEvent(withName: name, body: encodedBody)
    }
    catch {
      self.sendHaapiError(description: "Could not encode event as json. Error: \(error)");
    }
  }
  
   private func sendProblemEvent(_ problem: ProblemRepresentation) {
      sendHaapiEvent("ProblemRepresentation", body: problem)
  }
 
  private func sendHaapiError(description: String) {
    sendHaapiEvent("HaapiError", body: ["error": "HaapiError", "error_description": description])
  }
  
  private func encodeObject(_ object: Codable) throws -> Any {
    let jsonEncoder = JSONEncoder()
    do {
      let jsonData = try jsonEncoder.encode(object)
      let jsonString = String(bytes:jsonData, encoding: String.Encoding.utf8)
      return try JSONSerialization.jsonObject(with: jsonData)
    }
    catch {
      throw NSError()
    }
  }
  
  private func rejectRequestWithError(description: String, promise: Promise) {
    sendHaapiError(description: description)
    promise.reject("HaapiError", description, nil)
  }
  
  private func resolveRequest(eventName: String, body: Codable, promise: Promise) {
    sendHaapiEvent(eventName, body: body)
    promise.resolve(body)
  }
 
}
