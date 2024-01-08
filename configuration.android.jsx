const HaapiConfiguration = {
    "appRedirect": "app:start",
    "keyStoreAlias": "haapi-react-native",
    "clientId": "react-dev-client",
    "baseUri": "https://dlindau.ngrok.io",
    "tokenEndpointUri": "https://dlindau.ngrok.io/dev/oauth/token",
    "authorizationEndpointUri": "https://dlindau.ngrok.io/dev/oauth/authorize",
    "revocationEndpointUri": "https://dlindau.ngrok.io/revoke",
    "scope": "openid profile",
    "registrationEndpointUri": "https://dlindau.ngrok.io/oauth-dev/oauth-registration",
    "fallback_template_id": "react-native-fallback",
    "registration_secret": "my-good-secret"
}
export default HaapiConfiguration