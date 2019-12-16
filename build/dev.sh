#!/usr/bin/env bash

# 任意命令出错时终止运行
set -e

base=$( cd "$(dirname "$0")" ; pwd -P )/../
pages=("$@")

PAGES=$pages VUE_CLI_SERVICE_CONFIG_PATH=$base/build/vue.config.js vue-cli-service serve
