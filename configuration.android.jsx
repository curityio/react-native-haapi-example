const HaapiConfiguration = {
    "appRedirect": "app:start",
    "keyStoreAlias": "haapi-react-native",
    "clientId": "react-dev-client",
    "baseUri": "https://localhost:8443",
    "tokenEndpointUri": "https://localhost:8443/dev/oauth/token",
    "authorizationEndpointUri": "https://localhost:8443/dev/oauth/authorize",
    "revocationEndpointUri": "https://localhost:8443/revoke",
    "validateTlsCertificate": false,
    "scope": "openid profile",
    "registrationEndpointUri": "https://localhost:8443/oauth-dev/oauth-registration",
    "fallback_template_id": "react-native-fallback",
    "registration_secret": "my-good-secret"
}
export default HaapiConfiguration
