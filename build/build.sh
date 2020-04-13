#!/usr/bin/env bash

# 任意命令出错时终止运行
set -e

RED="\033[0;31m"
YELLOW="\033[1;33m"
GREEN="\033[0;32m"
RESET="\033[0m"

base=$( cd "$(dirname "$0")" ; pwd -P )/../

pages=("$@")

# node $base/build/cleanDist.js

if [ ${#pages[@]} -eq 0 ]; then
    echo "${RED}请指定页面。如：npm run build meal-config\n"
    exit 1
fi

:<<!
find ./sub1/fred -maxdepth 2 -name fred
　假如这个fred文件在./sub1/fred目录中，那么这个命令就会直接定位这个文件，查找很容易成功。
  假如，这个文件在./sub1/sub2/fred目录中，那么这个命令就无法查找到。
  因为前面已经给find命令在目录中最大的查询目录级别为2，只能查找2层目录下的文件。
  这样做的目的就是为了让find命令更加精确的定位文件，
  如果你已经知道了某个文件大概所在的文件目录级数，那么加入-maxdepth n 就很快的能在指定目录中查找成功。
!
if [ ! "$pages" = "all" ]; then
  for page in "${pages[@]}"
  do
    # 不能用 [[ ! -d xxx ]]，因为 Mac 下文件名不区分大小写，部分错误情况会检查不出来
    if [[ ! -n `find /$base/src/pages/ -maxdepth 1 -name $page` ]]; then
      echo "${RED}页面 $page 不存在!\n"
      exit 1
    fi
  done
fi

if [ "$pages" = "all" ]; then
  # 打包所有页面
  VUE_CLI_SERVICE_CONFIG_PATH=$base/build/vue.config.js vue-cli-service build
else
  # 打包指定页面
  if [ -d $base/dist ]; then
  echo '存在/。。。。。'
    mv $base/dist $base/dist-prev
  fi
  # 为什么不能直接用${pages[@]}，是因为它是数组['index two...'],我们需要把它转换成['index', 'two'....]
  pages_str=$(printf ",%s" "${pages[@]}")
  pages_str=${pages_str:1}
  PAGES=$pages_str VUE_CLI_SERVICE_CONFIG_PATH=$base/build/vue.config.js vue-cli-service build

  if [ -d $base/dist-prev ]; then
   cp -r $base/dist/* $base/dist-prev/
    rm -rf $base/dist
    mv $base/dist-prev $base/dist

    # node $base/build/cleanDist.js
  fi
fi
