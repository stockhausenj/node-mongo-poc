#!/bin/bash
pushd ./server && ./node_modules/.bin/eslint app.js
pushd ./client && ./node_modules/.bin/browserify js/sovereign.js > js/browserify/sovereign-bundle.js && popd
pushd ./client && ./node_modules/.bin/eslint js/*.js
