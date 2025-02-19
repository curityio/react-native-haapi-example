# Advanced Setup

The following notes explain some further details about setup and deployment.

## Use Config Specs

To configure clients needed for this example to run, there's config specs for [android](config/setup-android-no-attestation-validation.xml) and [ios](config/setup-ios-no-attestation-validation.xml) that can be imported using the admin UI in `Changes -> Run Config Spec`. Running a spec will prompt you for basic information needed to create the client. Some default values will be added, which for development purposes should not need to be changed. Redirect URI for the clients will configured as `app:start`.

## Configure Passkey Authentication

See [Mobile Logins Using Passkeys](https://curity.io/resources/learn/mobile-logins-using-native-passkeys/) article in the Curity resource library for setting up the authenticator and clients using the admin UI.
For convenience, clients can be setup using [android](config/setup-android-no-attestation-validation-passkeys.xml) or [ios](config/setup-ios-no-attestation-validation-passkeys.xml) config specs. Associated domains has to be added to the iOS workspace manually.

## Configure the Android Signing Certificate

Android needs to have the fingerprint of the signing certificate configured when passkeys are enabled. To find your fingerprint, go to `android/` folder in a terminal and issue:
```bash
./gradlew signingReport
```
Locate the SHA256 fingerprint in the report and configure it using the config spec.

## Use Pre-Release Modules

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

Alternatively, we can use the repo directly to be able to easily change the source code without having to pack the
module for each change.

```bash
npm uninstall @curity/react-native-haapi-module
npm install <path-to-repo> --save
```
