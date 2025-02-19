const HaapiConfiguration = {
    "appRedirect": "app:start",
    "keyStoreAlias": "haapi-react-native",
    "clientId": "haapi-android-client",
    "baseUri": "$IDSVR_BASE_URL",
    "tokenEndpointPathUri": "$IDSVR_BASE_URL/oauth/v2/oauth-token",
    "authorizationEndpointUri": "$IDSVR_BASE_URL/oauth/v2/oauth-authorize",
    "revocationEndpointUri": "$IDSVR_BASE_URL/oauth/v2/oauth-revoke",
    "validateTlsCertificate": false,
    "scope": "openid profile",
    "extraRequestParameters": {"ui_locales": "sv"},
    "extraHttpHeaders": {"my-good-header": "foo-bar"}
    // "fallback_template_id": "haapi-template-client",
    // "registrationEndpointUri": "$IDSVR_BASE_URL/token-service/oauth-registration",
    // "registration_secret": "Password1",
}
export default HaapiConfiguration
