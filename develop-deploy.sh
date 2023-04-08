#!/usr/bin/env bash

# compile
ng build

# upload static files

# shellcheck disable=SC2164
cd dist

scp -i shonan-front-server.pem -r poseidon-ng/* ubuntu@ec2-3-222-104-154.compute-1.amazonaws.com:/var/www/app.shonan.mexcorp.technology/html/
