#!/bin/bash

APP_PATH=`pwd`

STEPS=`find $APP_PATH -type d -name "step-*-done"`

for item in ${STEPS}
do
  if [ -f "$item/package.json" ];
  then
    cd "$item"
    npm test
  else
    echo "nothing to do for $item"
  fi
done
