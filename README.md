# React Native Example using HAAPI

[![Quality](https://img.shields.io/badge/quality-demo-red)](https://curity.io/resources/code-examples/status/)
[![Availability](https://img.shields.io/badge/availability-source-blue)](https://curity.io/resources/code-examples/status/)

## 1. Prepare a React Native Environment

First make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup).\
Follow the React Native instructions and ensure that you can run a basic app.

## 2. Deploy the Curity Identity Server

Get started with a local docker deployment of the Curity Identity Server.\
See the [Mobile Deployments README](https://github.com/curityio/mobile-deployments) for further information about the backend infrastructure.\
The deployment includes a [working configuration](https://github.com/curityio/mobile-deployments/blob/main/haapi/example-config-template.xml) with HAAPI development settings.

To run the deployment, first copy a `license.json` file for the Curity Identity Server into the root folder.\
Also ensure that you have the `envsubst` tool installed, e.g with `brew install gettext`.\
Then run the following script to deploy the system:

```bash
export USE_NGROK='false'
./start-idsvr.sh
```

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

To start an Android emulator, use a second terminal.\
Run the following command from the _root_ of the React Native project.

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

To start an iOS simulator, use a second terminal.\
Run the following command from the _root_ of the React Native project.

```bash
# using npm
npm run ios -- --simulator='iPhone 16 Pro'

# OR using Yarn
yarn ios
```

Start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.\
To do so, run the following command from the _root_ of the React Native project.

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## 5. Test Basic Logins

Run the app and first test basic logins using an HTML Form authenticator.\
Sign in to the deployed environment using the following test username and password.

- Username: `demouser`
- Password: `Password1`

## 6. Test Native Passkey Logins

Passkeys require hosting of an assets document at a trusted internet HTTPS URL.\
One way to enable that is to re-run the deployment and use an ngrok URL for the Curity Identity Server.

On iOS, first edit the `start-idsvr.sh` script to set your Apple details and use a unique bundle identifier.\
Then rerun the deployment script to use ngrok and test passkeys logins for both Android and iOS.

```bash
export APPLE_TEAM_ID='U3VTCHYEM7'
export APPLE_BUNDLE_ID='io.gary.haapi.react.example'
export USE_NGROK='true'
./start-idsvr.sh
```

On iOS, also open the `ios` folder in Xcode and configure the same details under `Signing & Capabilities`.\
For example, use the `Automatically manage signing` option for your Apple account.

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