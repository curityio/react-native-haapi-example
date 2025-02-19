const HaapiConfiguration = {
    "appRedirect": "app:start",
    "clientId": "haapi-ios-dev-client",
    "baseUri": "$IDSVR_BASE_URL",
    "tokenEndpointPathUri": "$IDSVR_BASE_URL/oauth/v2/oauth-token",
    "authorizationEndpointUri": "$IDSVR_BASE_URL/oauth/v2/oauth-authorize",
    "revocationEndpointUri": "$IDSVR_BASE_URL/oauth/v2/oauth-revoke",
    "validateTlsCertificate": false,
    "acrValues": "",
    "scope": "openid profile",
}
export default HaapiConfiguration