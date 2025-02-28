#!/bin/bash

####################################################################################################
# A developer deployment to run the Curity Identity Server in Docker on the local computer.
# The deployment provides a working configuration and includes native passkeys automation.
# - https://curity.io/resources/learn/mobile-logins-using-native-passkeys/
####################################################################################################

cd "$(dirname "${BASH_SOURCE[0]}")"

#
# First check for a license
#
if [ ! -f './license.json' ]; then
  echo 'Please copy a license.json file into the root folder of the code example'
  exit 1
fi

#
# Then validate or default parameters
#
EXAMPLE_NAME='haapi'
if [ "$USE_NGROK" != 'true' ]; then
  USE_NGROK='false'
  if [ "$IDSVR_HOST_NAME" == '' ]; then
    echo 'You must supply an IDSVR_HOST_NAME for the Curity Identity Server'
    exit 1
  fi
fi

#
# Download mobile deployment resources
#
if [ ! -d ./deployment ]; then
  rm -rf deployment
  git clone https://github.com/curityio/mobile-deployments deployment
  if [ $? -ne 0 ]; then
    echo 'Problem encountered downloading deployment resources'
    exit 1
  fi
fi

#
# To test passkeys on iOS, override these settings with a Team ID that you own and your own unique bundle ID
#
if [ "$APPLE_TEAM_ID" == '' ]; then
  export APPLE_TEAM_ID='MYTEAMID'
fi
if [ "$APPLE_BUNDLE_ID" == '' ]; then
  export APPLE_BUNDLE_ID='io.curity.haapi.react.example'
fi

#
# Override the HAAPI default configuration settings
#
cp config/docker-template.xml deployment/haapi/example-config-template.xml

#
# Run an automated deployment of the Curity Identity Server
#
cp ./license.json deployment/resources/license.json
if [ "$USE_NGROK" == 'true' ]; then
  ./deployment/start.sh 'true' '-' "$EXAMPLE_NAME"
else
  ./deployment/start.sh 'false' "https://$IDSVR_HOST_NAME:8443" "$EXAMPLE_NAME"
fi
if [ $? -ne 0 ]; then
  echo 'Problem encountered deploying the Curity Identity Server'
  exit 1
fi

#
# Get the final Curity Identity Server URL
#
export IDSVR_BASE_URL="$(cat ./deployment/output.txt)"
echo "Curity Identity Server is running at $IDSVR_BASE_URL"

#
# Update the application configuration to use the runtime base URL
#
envsubst < configuration.android.template > configuration.android.jsx
envsubst < configuration.ios.template     > configuration.ios.jsx
if [ $? -ne 0 ]; then
  echo 'Problem encountered running the envsubst tool to update configuration'
  exit 1
fi

#
# Ensure a working passkeys configuration that uses the ngrok URL
#
function replaceTextInFile() {

  FROM="$1"
  TO="$2"
  FILE="$3"
  
  if [ "$(uname -s)" == 'Darwin' ]; then
    sed -i '' "s/$FROM/$TO/g" "$FILE"
  else
    sed -i -e "s/$FROM/$TO/g" "$FILE"
  fi
}

if [ "$USE_NGROK" == 'true' ]; then
  IDSVR_HOST_NAME="${IDSVR_BASE_URL#https://}"
  replaceTextInFile 'localhost:8443' "$IDSVR_HOST_NAME" ./android/app/src/main/res/values/strings.xml
  replaceTextInFile 'localhost:8443' "$IDSVR_HOST_NAME" ./ios/HaapiReactNativeExample/HaapiReactNativeExample.entitlements
fi
