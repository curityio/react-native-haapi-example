# React Native example using HAAPI

[![Quality](https://img.shields.io/badge/quality-demo-red)](https://curity.io/resources/code-examples/status/)
[![Availability](https://img.shields.io/badge/availability-source-blue)](https://curity.io/resources/code-examples/status/)

Use the README instructions to prepare a deployment and configuration and then run the app.

## 1. Set up a React Native Environment

Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup).\
Follow the React Native instructions until the `Creating a new application` step.

## 2. Deploy the Curity Identity Server

Get started with the following script to deploy a Docker based Curity Identity Server.\
The deployment includes a [working configuration](https://github.com/curityio/mobile-deployments/blob/main/haapi/example-config-template.xml) for a local computer.\
Before running the script, ensure that you have the `envsubst` tool installed, e.g with `brew install gettext`.

```bash
./start-idsvr.sh
```

## 3. Understand Application Configuration

The script also updates the application configuration to point to the deployed system:

- [Android Application Configuration](configuration.android.jsx)
- [iOS Application Configuration](configuration.ios.jsx)

## 4. Run the Application

First install React native dependencies:

```bash
npm install
```

For iOS, also generate an Xcode workspace where you can run the example in an emulator:

```bash
cd ios
pod install
```

Then start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.\
To start Metro, run the following command from the _root_ of the React Native project:

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

To start an iOS emulator for the first time, use a second terminal.\
Run the following command from the _root_ of the React Native project:

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

## 5. Test Logins

## Further Information

- See the [React Native HAAPI Code Example](https://curity.io/resources/learn/react-native-haapi/) for an overview of the code example's behaviors.
- See the [Confgiure Native Passkeys for Mobile Logins](https://curity.io/resources/learn/mobile-logins-using-native-passkeys/) tutorial for details on the technical setup.
