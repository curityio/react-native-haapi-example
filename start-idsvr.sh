#!/bin/bash

####################################################################################################
# A developer deployment to run the Curity Identity Server in Docker on the local computer.
# The deployment provides a working configuration and includes native passkeys automation.
#
# Please ensure that the following resources are installed before running this script:
# - Docker Desktop
# - The envsubst tool (`brew install gettext` on macOS)
#
# To use native passkeys, you can expose the local instance of the Curity Identity Server via ngrok.
# In this case, also install the following tools:
# - ngrok
# - The jq tool (`brew install jq` on macOS)
####################################################################################################

cd "$(dirname "${BASH_SOURCE[0]}")"

#
# First get the host IP address that connected devices or emulators / simulators can connect to.
# On Android, older emulators may instead require the special IP address of 10.0.2.2 for the host computer.
#
if [ "$HOST_IP_ADDRESS" == '' ]; then
  HOST_IP_ADDRESS=$(ipconfig getifaddr en0)
fi

if [ "$USE_NGROK" != 'true' ]; then
  USE_NGROK='false'
fi

#
# Set USE_NGROK to true and a dynamic NGROK base URL will be used automatically.
#
BASE_URL="https://$HOST_IP_ADDRESS:8443"
EXAMPLE_NAME='haapi'

#
# First check prerequisites
#
if [ ! -f './license.json' ]; then
  echo 'Please copy a license.json file into the root folder of the code example'
  exit 1
fi

#
# Download mobile deployment resources
#
rm -rf deployment
git clone https://github.com/curityio/mobile-deployments deployment
if [ $? -ne 0 ]; then
  echo 'Problem encountered downloading deployment resources'
  exit 1
fi

cd deployment
git checkout feature/sdk_update
cd ..

#
# Set attestation and passkey related parameters for this app's deployment
# https://curity.io/resources/learn/mobile-logins-using-native-passkeys/
#
export ANDROID_PACKAGE_NAME='io.curity.haapi.react.example'
export ANDROID_SIGNATURE_DIGEST='+sYXRdwJA3hvue3mKpYrOZ9zSPC7b4mbgzJmdZEDO5w='
export ANDROID_FINGERPRINT='FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C'

#
# To test passkeys on iOS, update to a Team ID that you own and a unique bundle ID
#
export APPLE_TEAM_ID='MYTEAMID'
export APPLE_BUNDLE_ID='io.curity.haapi.react.example'

#
# Run an automated deployment of the Curity Identity Server
#
cp ./license.json deployment/resources/license.json
./deployment/start.sh "$USE_NGROK" "$BASE_URL" "$EXAMPLE_NAME"
if [ $? -ne 0 ]; then
  echo 'Problem encountered deploying the Curity Identity Server'
  exit 1
fi

#
# Inform the user of the Curity Identity Server URL, to be copied to configuration
#
RUNTIME_BASE_URL="$(cat ./deployment/output.txt)"
echo "Curity Identity Server is running at $RUNTIME_BASE_URL"

#
# Update the application configuration to use the runtime base URL
#
export IDSVR_BASE_URL="$RUNTIME_BASE_URL"
envsubst < configuration.android.template > configuration.android.jsx
envsubst < configuration.ios.template     > configuration.ios.jsx
if [ $? -ne 0 ]; then
  echo 'Problem encountered running the envsubst tool to update configuration'
  exit 1
fi