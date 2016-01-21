#!/usr/bin/env bash
# Start the webpack dev server

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/.."
src=$project_root/src
dist=$project_root/dist

bower install

mkdir -p $dist
cp $src/index.html $dist
cp -R $src/components $dist

webpack-dev-server --config ./webpack.conf.js --content-base $dist/
