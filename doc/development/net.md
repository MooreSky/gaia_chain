# 网络协议

## 功能概述

* 机制: 底层都是TCP；
   + pub-sub，消息队列；MQTT
   + req-resp，RPC

场景如下

* 节点发现
   + rpc getaddr
   + pub addr
* 同步区块
   + 场景：本地没有任何区块，从创世区块开始同步
   + 场景：本地已有区块，从下一个开始同步
   + rpc getBestHeight
   + rpc getHeaders
   + rpc getHeadersByHash
   + rpc getBlocks
* 广播区块
   + 时机：锻造出区块
   + 时机：收到新区块
   + pub header
   + rpc getTransactionsByShortIDS
* 广播交易
   + 时机：收到新交易
   + pub transaction

## 节点发现

可以保持主动连接和被动连接的节点：都是10个数可以调整，不影响流程

启动的时候，从种子节点获取首次ip；

连接获取到的ip；

问题：需不需要定时随机断开某些链接，加入新的链接？

过一段时间，没有任何反应的peer，视为断开连接，主动关闭；

// rpc：跟特定的peer要地址
// 时机：定时器轮询，10秒中
// 时机：本节点主动链接别人的时候
peer.rpc("getaddr", [], addresses => {

});

// addr 广播消息，一次最多只能广播50个地址
// 时机：收到别人的 新 消息时
peer.publish("addr", [addr1, addr2, ...]);

## 同步区块：从创世区块开始

典型的生产者-消费者场景

跟一堆节点要高度，然后开始下载区块头；有了串成链的头，就立马下载对应的体；

- 获取区块头
    - 使用连接成功后节点返回的区块高度，取最大
    - 请求区块头：随机分段发送给连接节点，获取头部信息
    - 拼接区块头

下载的头和体，简单验证后，就立即落地，临时区块表；

- 获取区块体
    - 批量获取区块头[h1,h2,...],被请求的节点验证所有区块都存在则返回，否则报错
    - 对验证通过的区块写入数据库

用另外的线程去取数据库，进行详细验证；

问题：可能需要一个文件表，来描述当前详细验证到那个区块了。
    - 可以通过数据库记录来获取最后验证的区块

// 取peer主链的高度
peer.rpc("getBestHeight", [], bestBlockHeight => {

});

// 取区块头，一次返回2000个
// endHeight = 0时候，尽可能多的返回
// 对方返回当前主链的区块
peer.rpc("getHeadersByHash",  [hash, count: I32], headers => {

});

peer.rpc("getHeaders", [startHeight, endHeight], headers => {

});

// 取块体，真正的交易数据
// blockDatas，数组，如果没有对应的hash，对应的槽返回NULL
peer.rpc("getBlocks", [blockHash1, blockHash2, ...], blockDatas => {

});

## 同步区块：从已有区块的下一个开始

rpc还是上面那些；

流程：getHeaders, getBlocks

## 广播区块

时机：锻造出区块；收到新区块

* 流程
   + 发布消息：该区块的头，和该块交易的短hash
   + 对方收到后，到本地的内存池查对应的交易，从新组装块
   + 过滤之后，向本节点发rpc，getTransactionsByShortIDS
   - 获取失败怎么处理？从其他节点获取交易，如果都没获取到，将区块放入暂存区

// TransactionShortID: U48;
peer.publich("header", Header + TransactionShortID[]);

// 取交易
// Offset1: TransactionShortID的索引
peer.rpc("getTransactionsByShortIDS", [blockHash, Offset1, ...], txs => {
    
});

## 广播交易

时机：收到别人发过来的交易时，广播

- 对验证有问题的交易放入，孤儿池 需要继续广播？
- 对验证通过的交易放入交易池，并继续广播

peer.publish("transaction", TransactionData);
