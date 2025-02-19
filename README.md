# React Native example using HAAPI

[![Quality](https://img.shields.io/badge/quality-demo-red)](https://curity.io/resources/code-examples/status/)
[![Availability](https://img.shields.io/badge/availability-source-blue)](https://curity.io/resources/code-examples/status/)

## 1. Set up a React Native Environment

First make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup).\
Follow the React Native instructions and ensure that you can run a basic app.

## 2. Deploy the Curity Identity Server

Get started with the following script to deploy a Docker based Curity Identity Server.\
The deployment includes a [working configuration](https://github.com/curityio/mobile-deployments/blob/main/haapi/example-config-template.xml) for a local computer.\
Before running the script, ensure that you have the `envsubst` tool installed, e.g with `brew install gettext`.

```bash
USE_NGROK='false'
./start-idsvr.sh
```

## 3. Set the Application Configuration

The script performs the following tasks, which can be done manually if you prefer:

- Create the root level `configuration.android.jsx`  file from the [configuration.android.template](configuration.android.template) file.
- Create the root level `configuration.ios.jsx`  file from the [configuration.ios.template](configuration.ios.template) file.

## 4. Run the Application

First install React native dependencies:

```bash
npm install
```

For iOS, also generate an Xcode workspace where you can run the example in an emulator.\
You may need to apply [this workaround](https://github.com/facebook/react-native/issues/42109#issuecomment-1880663873) if the `pod install` command fails.

```bash
cd ios
pod install
```

Then start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.\
To do so, run the following command from the _root_ of the React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

To start an Android emulator for the first time, use a second terminal.\
Run the following command from the _root_ of the React Native project

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

To start an iOS simulator for the first time, use a second terminal.\
Run the following command from the _root_ of the React Native project:

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

## 5. Test Logins

Run the app and first test basic logins using an HTML Form authenticator.\
Sign in to the deployed environment using the following test username and password:

- Username: `demouser`
- Password: `Password1`

To test logins with native passkeys, an assets document must run at a trusted internet HTTPS URL.\
One way to do so is to re-run the deployment so that the Curity Identity Server using an ngrok URL.\
The application configuration then updates to point to ngrok's internet HTTPS URL.

```bash
USE_NGROK='true'
./start-idsvr.sh
```

## 6. Learn about the React Native HAAPI Module

The example app uses the [React Native HAAPI Module](https://github.com/curityio/react-native-haapi-module), whose README explains more about options.\
Use pre-released modules by updating the example app to use a file based dependency.\
If you need to troubleshoot you can perform actions like adding `println` statements to the module's Kotlin code.

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

## 7. Use Config Specs for Deployed Environments

This repo also includes some parameterized configuration (config specs) that you can import using the admin UI.\
Run the `Changes -> Run Config Spec` command to upload a config spec and enter parameters:

- [android config spec](config/setup-android-no-attestation-validation.xml) 
- [ios config spec](config/setup-ios-no-attestation-validation.xml)

## Further Information

- See the [React Native HAAPI Code Example](https://curity.io/resources/learn/react-native-haapi/) for an overview of the code example's behaviors.
- See the [Configure Native Passkeys for Mobile Logins](https://curity.io/resources/learn/mobile-logins-using-native-passkeys/) tutorial for details on the technical setup.
- See the [Mobile Setup with ngrok](https://curity.io/resources/learn/mobile-setup-ngrok/) tutorial for details about testing with ngrok.
