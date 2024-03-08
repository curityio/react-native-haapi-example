# React Native example using HAAPI

[![Quality](https://img.shields.io/badge/quality-demo-red)](https://curity.io/resources/code-examples/status/)
[![Availability](https://img.shields.io/badge/availability-source-blue)](https://curity.io/resources/code-examples/status/)

# Getting Started

> **Note**: Make sure you have completed
> the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a
> new
> application" step, before proceeding.


To install necessary dependencies, run

```bash
npm install
```

# Development modules
To be able to run unreleased modules, you need to checkout the module repo and update the dependency to be file based. 
First, create the package:
```bash
git clone https://github.com/curityio/react-native-haapi-module.git
cd react-native-haapi-module
npm pack
```

This should create a `.tgz` file.

Then we can update the depdencies.

```bash
npm uninstall @curity/react-native-haapi-module
npm install <path-to-file>.tgz --save
```

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the
following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_
shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

# Curity Identity Server configuration

To configure clients needed for this example to run on android, theres
a [Config Spec](android-with-fallback-config-spec.xml) that can be imported using the admin UI
in `Changes -> Run Config Spec`. Running this spec will prompt you for the relevant information needed to setup the
server for using HAAPI with attestation, and fallback dynamic registration when attestation is not supported.
