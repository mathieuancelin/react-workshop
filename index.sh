#!/bin/bash

APP_PATH=`pwd`

STEPS=`find . -type d -name "step-*"`

for item in ${STEPS[*]}
do
  if [ -f "$item/package.json" ];
  then
    npm install
  else
    echo "nothing to do for $item"
  fi
done
