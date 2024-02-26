//
//  ConfigurationHelper.swift
//  HaapiReactNativeExample
//
//  Created by Daniel Lindau on 2024-02-23.
//

import Foundation
import IdsvrHaapiSdk

class ConfigurationHelper {
  private enum InvalidconfigurationError : Error {
    case missingParameter(parameter: String)
    case invalidUrl(url: String)
  }

/*
   const HaapiConfiguration = {
   "appRedirect": "app:start",
   "keyStoreAlias": "haapi-react-native",
   "clientId": "react-dev-client",
   "baseUri": "https://dlindau.ngrok.io",
   "tokenEndpointUri": "https://dlindau.ngrok.io/dev/oauth/token",
   "authorizationEndpointUri": "https://dlindau.ngrok.io/dev/oauth/authorize",
   "scope": "openid profile"
   }
   */
  public static func createHaapiConfiguration(data : Dictionary<String, Any>) throws -> HaapiConfiguration {
    let scope = getStringArrayFromSpaceSeparated(data: data, configKey: "scope")
    let acrValues = getStringArrayFromSpaceSeparated(data: data, configKey: "acrValues")
    return HaapiConfiguration(name: "HaapiModule",
                              clientId: try getStringOrThrow(data: data, configKey: "clientId"),
                              baseURL: try getUrlOrThrow(data: data, configKey: "baseUri"),
                              tokenEndpointURL: try getUrlOrThrow(data: data, configKey: "tokenEndpointUri"),
                              authorizationEndpointURL: try getUrlOrThrow(data: data, configKey: "authorizationEndpointUri"),
                              appRedirect: getStringOrDefault(data: data, configKey: "appRedirect", defaultString: "app:start"),
                              httpHeadersProvider: nil,
                              authorizationParametersProvider: { () -> OAuthAuthorizationParameters in OAuthAuthorizationParameters(scopes: scope, acrValues: acrValues) },
                              isAutoRedirect: true)
    
  }
    
  private static func getUrlOrThrow(data: Dictionary<String, Any>, configKey: String) throws -> URL {
    let str = try getStringOrThrow(data: data, configKey: configKey)
    guard let url = URL(string: str) else { throw InvalidconfigurationError.invalidUrl(url: str) }
    return url
  }
  
  private static func getStringOrThrow(data: Dictionary<String, Any>, configKey: String) throws -> String {
    guard let str = data[configKey] else { throw InvalidconfigurationError.missingParameter(parameter: configKey) }
    return String(describing: str)
  }
  
  private static func getStringOrDefault(data: Dictionary<String, Any>, configKey: String, defaultString: String) -> String {
    guard let str = data[configKey] else { return defaultString }
    return String(describing: str)
  }
  
  private static func getStringArrayFromSpaceSeparated(data: Dictionary<String, Any>, configKey: String) -> [String] {
    return getStringOrDefault(data: data, configKey: configKey, defaultString: "")
      .split(separator: " ")
      .map { String($0) }
  }
}
