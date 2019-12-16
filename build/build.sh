#!/usr/bin/env bash

# 任意命令出错时终止运行
set -e

base=$( cd "$(dirname "$0")" ; pwd)

pages=("$@")

if [ ${#pages[@]} -eq 0 ]; then
    echo "${RED}请指定页面。如：npm run build meal-config\n"
    exit 1
fi

# if [ ! "$pages" = "all" ]; then
#   for page in "${pages[@]}"
#   do
#     # 不能用 [[ ! -d xxx ]]，因为 Mac 下文件名不区分大小写，部分错误情况会检查不出来
#     if [[ ! -n `find /$base/pages/ -maxdepth 1 -name $page` ]]; then
#       echo "${RED}页面 $page 不存在!\n"
#       exit 1
#     fi
#   done
# fi

if [ "$pages" = "all" ]; then
  # 打包所有页面
  VUE_CLI_SERVICE_CONFIG_PATH=$base/build/vue.config.js vue-cli-service build
else
  # 打包指定页面
  # if [ -d $base/dist ]; then
  #   mv $base/dist
  # fi

  pages_str=$(printf ",%s" "${pages[@]}")
  pages_str=${pages_str:1}
  echo $base/vue.config.js
  PAGES=$pages_str VUE_CLI_SERVICE_CONFIG_PATH=$base/vue.config.js vue-cli-service build
  # PAGES=$pages_str VUE_CLI_SERVICE_CONFIG_PATH=$base/build/vue.config.js vue-cli-service build

  # if [ -d $base/dist-prev ]; then
  #   cp -r $base/dist/* $base/dist-prev/
  #   rm -rf $base/dist
  #   mv $base/dist-prev $base/dist

  #   node $base/build/cleanDist.js
  # fi
fi
