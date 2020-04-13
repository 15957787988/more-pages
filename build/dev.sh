#!/usr/bin/env bash

# 任意命令出错时终止运行
set -e

base=$( cd "$(dirname "$0")" ; pwd -P )/../
pages=("$@")

 # 为什么不能直接用${pages[@]}，是因为它是数组['index two...'],我们需要把它转换成['index', 'two'....]
pages_str=$(printf ",%s" "${pages[@]}")
pages_str=${pages_str:1}
echo "pages_str11 ${pages[@]}"
PAGES=$pages_str VUE_CLI_SERVICE_CONFIG_PATH=$base/build/vue.config.js vue-cli-service serve
