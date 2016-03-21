#!/bin/bash

APP_PATH=`pwd`

STEPS=`find $APP_PATH -type d -name "step-*"`

for item in ${STEPS[*]}
do
  if [ -f "$item/package.json" ];
  then
    cd "$item"
    echo "fetching dependencies for $item"
    npm install
  else
    echo "nothing to do for $item"
  fi
done

cd "$APP_PATH/api"
echo "fetching dependencies for the Wine API"
npm install

cd "$APP_PATH"
