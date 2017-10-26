#!/bin/bash
pushd ./server && ./node_modules/.bin/eslint app.js && popd
pushd ./client/js && ./node_modules/.bin/browserify sovereign.js > browserify/sovereign-bundle.js && popd
pushd ./client/js && ./node_modules/.bin/eslint *.js && popd
