# gaia blockchain

## 运行

* gaia_chain 拉下来后，切换到rust分支
* 同层目录，git clone pi_build，切换到rust分支
* 将pi_build项目的node_modules拷贝到gaia_chain目录
* 构建：gaia_chain/scripts/build.bat
* 运行: gaia_chain/run/run.bat

## 项目的目录结构

* pi_build
   + **注意：** 切换到rust分支
* gaia_chain
   + **注意：** 切换到rust分支
   + node_modules
      **注意：** 从pi_build将node_modules拷贝过来
* scripts 构建脚本
   + .conf 构建规则描述
   + build.bat 构建批处理脚本，作用，将../src的源码构建到../run/gaia中
      **注意：** 项目开发期间，需要开着这个脚本
* run 启动目录
   + bin 二进制和初始化文件
   + run.bat 启动脚本
      **注意：** 命令行参数是 -c，后要启动的目录，多个目录以逗号隔开
* src 源码，以ts构成
   + pi 基础代码
   + bridge rust层的桥接代码
   + app 项目代码
   + tests 测试代码
      * framework 单元测试mocha框架代码

## 特殊后缀的ts

* *.i.ts 启动代码。
* *.u.ts 更新代码，暂时没用。目的：？？？
* *.s.ts rust数据结构生成的中间代码。
* *.c.ts 配置，可以从execl电子表格生成，也可以手写；但是要用这个后缀表明他是配置。
* *.wjs 前后端通用的初始化代码。