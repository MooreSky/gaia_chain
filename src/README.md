# 项目的代码结构

## 业务层

提供区块链的业务流程

+ sync 同步流程
+ cpos 出块流程
+ verification 验证流程
+ chain 链的结构
+ keys 区块链的密码封装

## 基础层

提供通用的数据结构和算法实现。

**注**：有些数据和接口是构建工具通过rust接口生成。

+ crypto 密码相关的封装
+ net 网络层的封装（rpc，mqtt）
+ storage 数据库存储的封装
+ util 基础数据结构