#!/bin/bash

APP_PATH=`pwd`

cd "$APP_PATH/step-2"
npm test
cd "$APP_PATH/step-3"
npm test
cd "$APP_PATH/step-4"
npm test
cd "$APP_PATH/step-5"
npm test
cd "$APP_PATH/step-6"
npm test
cd "$APP_PATH/step-7"
npm test

cd "$APP_PATH"
