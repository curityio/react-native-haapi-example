#!/bin/bash

###############################################################
# Free deployment resources when finished with the code example
###############################################################

USE_NGROK='false'
EXAMPLE_NAME='haapi'

#
# Download mobile deployment resources
#
if [ ! -d ./deployment ]; then
  rm -rf deployment
  git clone https://github.com/curityio/mobile-deployments deployment
  if [ $? -ne 0 ]; then
    echo 'Problem encountered downloading deployment resources'
    exit
  fi
fi

#
# Do the teardown
#
./deployment/stop.sh "$USE_NGROK" "$EXAMPLE_NAME"
