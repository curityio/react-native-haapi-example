const HaapiConfiguration = {
    "appRedirect": "app:start",
    "keyStoreAlias": "haapi-react-native",
    "clientId": "react-android",
    "baseUri": "https://dlindau.ngrok.io",
    "tokenEndpointUri": "https://dlindau.ngrok.io/dev/oauth/token",
    "authorizationEndpointUri": "https://dlindau.ngrok.io/dev/oauth/authorize",
    "revocationEndpointUri": "https://dlindau.ngrok.io/revoke",
    //"registrationEndpointUri": "https://dlindau.ngrok.io/register",
    //"fallback_template_id": "react-android-template",
    //"registration_secret": "Password1",
    "validateTlsCertificate": true,
    "scope": "openid profile",
    "extraRequestParameters": {"ui_locales": "sv"},
    "extraHttpHeaders": {"my-good-header": "foo-bar"}
}
export default HaapiConfiguration