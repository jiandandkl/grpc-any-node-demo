# grpc-any-node-demo
grpc中Any类型在node的应用

#### 如何使用

```javascript
const Client = require('./index')
const client = new Client({
  ip,
  packageName: 'hello',
  // proto中设置到Any类型字段中的message
  msgProto: 'HeiProto',
  // 编译后的两个proto文件
  servicePath: grpcProtoPath,
  messagesPath: protoPath,
})

client.grpcSend({
  field1: 'xx',
  field2: 'xxx',
  extra: {
    field3: 'xxx',
  }
})

```

该demo仅供参考,如extra字段为现proto定义好的google.protobuf.Any类型

关于grpc趟了一些坑,记录了篇博客[grpc的Any类型在node中应用](https://jiandandkl.github.io/2019/08/24/grpc%E7%9A%84Any%E7%B1%BB%E5%9E%8B%E5%9C%A8node%E4%B8%AD%E5%BA%94%E7%94%A8/)