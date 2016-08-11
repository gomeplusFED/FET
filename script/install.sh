#!/bin/bash

# install modules for dev and production

echo -e '\nProcessing install dependencies ...\n'

npm install -d && cd src/ && npm install -d

echo -e '\ndone.\n'
