#!/bin/bash

APP_PATH=`pwd`

cd "$APP_PATH/step-1-done"
npm test
cd "$APP_PATH/step-2-done"
npm test
cd "$APP_PATH/step-3-done"
npm test
cd "$APP_PATH/step-4-done"
npm test
cd "$APP_PATH/step-5-done"
npm test
cd "$APP_PATH/step-6-done"
npm test
cd "$APP_PATH/step-7"
npm test

cd "$APP_PATH"

echo "Done"
