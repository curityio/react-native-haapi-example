# React Native example using HAAPI

[![Quality](https://img.shields.io/badge/quality-demo-red)](https://curity.io/resources/code-examples/status/)
[![Availability](https://img.shields.io/badge/availability-source-blue)](https://curity.io/resources/code-examples/status/)

Use the README instructions to prepare a deployment and configuration and then run the app.

## 1. Set up a React Native Environment

Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup).\
Follow the instructions until the `Creating a new application` step.

## 2. Deploy the Curity Identity Server

Get started with the following script to deploy a Docker based Curity Identity Server with a [working configuration](https://github.com/curityio/mobile-deployments/blob/main/haapi/example-config-template.xml):

```bash
./start-idsvr.sh
```

## 3. Understand Application Configuration

The script also updates the application configuration to point to the deployed system:

- [configuration.android.jsx](configuration.android.jsx)
- [configuration.ios.jsx](configuration.ios.jsx)

## 4. Run the Application

First install React native dependencies:

```bash
npm install
```

For iOS, also generate an XCode workspace where you can run the example in an emulator:

```bash
cd ios
pod install
```

Then start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.\
To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

Open a second terminal from the _root_ of your React Native project.\
Run the following command to start the Android app:

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

Run the following command to start the iOS app:

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

## 5. Test Logins

TODO