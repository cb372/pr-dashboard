#!/usr/bin/env bash
# Copy/build the required files to the dist/ directory

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/.."
src=$project_root/src
dist=$project_root/dist

bower install

mkdir -p $dist
cp $src/index.html $dist
cp -R $src/components $dist

webpack --config ./webpack.conf.js
