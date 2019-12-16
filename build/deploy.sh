#!/usr/bin/env bash

set -e

RED="\033[0;31m"
YELLOW="\033[1;33m"
GREEN="\033[0;32m"
RESET="\033[0m"

:<<!
https://my.oschina.net/yzbty32/blog/517285
 shell获取当前工作目录绝对路径
 dirname  $0，取得当前执行的脚本文件的父目录
 cd dirname $0，进入这个目录(切换当前工作目录)
 pwd，显示当前工作目录(cd执行后的)
 $* 和 $@ 都表示传递给函数或脚本的所有参数
!

base=$( cd "$(dirname "$0")" ; pwd -P )/../

pages=("$@")

if [ ${#pages[@]} -eq 0 ]; then 
    echo "${RED}请指定页面。如：npm run deploy meal-config\n"
    exit 1
fi

if [ "$pages" == "all" ]; then
  echo "${RED}高风险操作!!!"
  echo "${GREEN}请指定页面。如：npm run deploy meal-config\n"
  exit 1
fi  

# if [ ! "$pages" = "all" ]; then
#   for page in "${pages[@]}"
#   do
#     # 不能用 [[ ! -d xxx ]]，因为 Mac 下文件名不区分大小写，部分错误情况会检查不出来
#     if [[ ! -n `find $base/pages/ -maxdepth 1 -name $page` ]]; then
#       echo "${RED}页面 $page 不存在!\n"
#       exit 1
#     fi
#   done
# fi

echo "${YELLOW}\n> 打包代码...${RESET}"
npm run build "${pages[@]}"
