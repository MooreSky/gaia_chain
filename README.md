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

* *.i.ts 启动代码
* *.u.ts 更新代码，暂时没用。目的：？？？
* *.s.ts rust数据结构生成的中间代码。
* *.c.ts 配置，可以从execl电子表格生成，也可以手写；但是要用这个后缀表明他是配置。
* *.wjs 前后端通用的初始化代码。

## TODO

### 平台以及对应的ts封装

#### 高优先级（近几天内完成）

* BCPT-26，修改ts封装到rust的函数名，规范是驼峰结构，比如 set_timeout 改为 setTimeout
   + 理由：统一ts层的规范命名
* 如何从 Uint8Array 转换成对应的 Hash
   + src/bridge/rust/pi_math/hash.ts

#### 中优先级 （7月底前）

+ BCPT-29，文件系统的ts封装（读写文件，遍历目录）
   * 用途：测试文件的自动化加载
+ BCPT-28, bridge层的ts，导出代码的时候，需要导出注释
   * 理由：如果没有注释，项目人员难以使用
+ BCPT-25，bin目录下js文件的整理
   * 理由：因为bin目录都是exe和dll，可以考虑放个initjs子目录放js文件

#### 低优先级 （暂时无日程规划）

+ BCPT-24，性能profile监控
   * 包括两层：js层，rust层
+ BCPT-27，bridge层ts代码的格式化
   * 理由：统一输出代码格式
+ BCPT-23，区分编译中间层文件的方案
   * 理由：中间层文件，不能上传git

### 项目


