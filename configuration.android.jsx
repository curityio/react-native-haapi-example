const HaapiConfiguration = {
    appRedirect: 'app:start',
    keyStoreAlias: 'haapi-react-native',
    clientId: 'react-dev-client',
    baseUri: 'https://cb67-31-208-44-131.ngrok-free.app',
    tokenEndpointUri: 'https://cb67-31-208-44-131.ngrok-free.app/dev/oauth/token',
    authorizationEndpointUri: 'https://cb67-31-208-44-131.ngrok-free.app/dev/oauth/authorize',
    revocationEndpointUri: 'https://cb67-31-208-44-131.ngrok-free.app/revoke',
    scope: 'openid profile',
    registrationEndpointUri: 'https://cb67-31-208-44-131.ngrok-free.app/dcr',
    fallback_template_id: 'react-native-fallback',
    registration_secret: 'my-good-secret',
};
export default HaapiConfiguration;
