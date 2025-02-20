# React Native Example using HAAPI

[![Quality](https://img.shields.io/badge/quality-demo-red)](https://curity.io/resources/code-examples/status/)
[![Availability](https://img.shields.io/badge/availability-source-blue)](https://curity.io/resources/code-examples/status/)

## 1. Prepare a React Native Environment

First make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup).\
Follow the React Native instructions and ensure that you can run a basic app.

## 2. Deploy the Curity Identity Server

Ensure that the local computer has these prerequisites:

- A Docker engine.
- The `envsubst` tool, e.g with `brew install gettext`.
- The `jq` tool, e.g with `brew install jq`.

Get started with a local Docker deployment of the Curity Identity Server.\
See the [Mobile Deployments README](https://github.com/curityio/mobile-deployments) for further information about the backend infrastructure.

To run the deployment, first copy a `license.json` file for the Curity Identity Server into the root folder.\
Then deploy the system, and indicate how connected emulators or devices call the Curity Identity Server.\
The following example uses an ngrok URL:

```bash
export USE_NGROK='true'
./start-idsvr.sh
```

Alternatively, provide a host name with which connected emulators or devices call the Curity Identity Server.\
The local computer's IP address should work for both Android and iOS on connected emulators and devices.\
The following commands should work on macOS:

```bash
export USE_NGROK='false'
export IDSVR_HOST_NAME="$(ipconfig getifaddr en0)"
./start-idsvr.sh
```

Note that some older Android emulators might require `IDSVR_HOST_NAME` to be set to the special value `10.0.2.2`.

## 3. Configure the Application

The script performs the following tasks, which you could also do manually:

- Populate base URLs in the `configuration.android.jsx` file from the [configuration.android.template](configuration.android.template) file.
- Populate base URLs in `configuration.ios.jsx` file from the [configuration.ios.template](configuration.ios.template) file.

## 4. Run the Application

First install React native dependencies.

```bash
npm install
```

For iOS, also generate an Xcode workspace where you can run the example in an emulator.\
You may need to apply [this workaround](https://github.com/facebook/react-native/issues/42109#issuecomment-1880663873) if the `pod install` command fails.

```bash
cd ios
pod install
```

### Run the Metro Server

Run the JavaScript _bundler_ that ships _with_ React Native from the _root_ of the React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

Let Metro Bundler run in its _own_ terminal and open a _new_ terminal from the _root_ of your React Native project.

### For Android

Run the following command to start your _Android_ app:

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```


### For iOS

Run the following command to start your _iOS_ app:

```bash
# using npm
npm run ios -- --simulator='iPhone 16 Pro'

# OR using Yarn
yarn ios
```

## 5. Test Basic Logins

Run the app and first test basic logins using an HTML Form authenticator.\
Sign in to the deployed environment and use a pre-shipped test user account.

- Username: `demouser`
- Password: `Password1`

## 6. Test Native Passkey Logins

Passkeys require hosting of assets documents at trusted internet HTTPS URL.\
On iOS, you must also provide overrides with your own Apple team ID and unique bundle identifier.\
You can use ngrok to host assets documents and test passkeys logins for both Android and iOS.\
The following example commands deploy the Curity Identity Server with a passkeys configuration:

```bash
export APPLE_TEAM_ID='MYTEAMID'
export APPLE_BUNDLE_ID='io.myorganization.haapi.react.example'
export USE_NGROK='true'
./start-idsvr.sh
```

On iOS, also open the `ios` folder in Xcode and configure the team ID and bundle ID under `Signing & Capabilities`.\
Also ensure that Apple development tools sign the app, such as with the `Automatically manage signing` option.

## 7. Learn about the React Native HAAPI Module

The example app uses the [React Native HAAPI Module](https://github.com/curityio/react-native-haapi-module), whose README explains more about options.\
Use pre-released modules by updating the example app to use a file based dependency.\
You can change the module code, e.g. to add `println` debug statements, then run it with the example app.

```bash
git clone https://github.com/curityio/react-native-haapi-module.git
npm uninstall @curity/react-native-haapi-module
npm install <path-to-repo> --save
```

Alternatively, build the module as a `.tgz` file and update the example app to use it:

```bash
npm uninstall @curity/react-native-haapi-module
npm install <path-to-file>.tgz --save
```

## 8. Use Config Specs for Deployed Environments

This repo also includes some parameterized configuration (config specs) that you can import using the admin UI.\
Run the `Changes -> Run Config Spec` command to upload a config spec and enter parameters:

- [android config spec](config/setup-android-no-attestation-validation.xml) 
- [ios config spec](config/setup-ios-no-attestation-validation.xml)

## Further Information

See also the following related tutorials:

- The [React Native HAAPI Code Example](https://curity.io/resources/learn/react-native-haapi/) provides an overview of the code example's behaviors.
- The [ngrok tutorials](https://curity.io/resources/learn/mobile-setup-ngrok/) explain how to use an internet URL and also how to [capture HAAPI messages](https://curity.io/resources/learn/expose-local-curity-ngrok/#ngrok-inspection-and-status).
-  The [Configure Native Passkeys for Mobile Logins](https://curity.io/resources/learn/mobile-logins-using-native-passkeys/) tutorial explains the technical setup when using passkeys.
- The [Implementing HAAPI Attestation Fallback](https://curity.io/resources/learn/implementing-haapi-fallback/) explains some extra steps if you need to deal with non-compliant Android devices.