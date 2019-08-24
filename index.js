const grpc = require('grpc')
const googleProtobufAnyPb = require('google-protobuf/google/protobuf/any_pb.js')
const path = require('path')
function Client ({ip, packageName, protoMsg, servicePath, messagesPath}) {
  const services = require(servicePath)
  const messages = require(messagesPath)
  this.client = new services.ReportServiceClient(ip, grpc.credentials.createInsecure())
  this.messages = messages
  this.packageName = packageName
  this.protoMsg = protoMsg
}

Client.prototype.grpcSend = function grpcSend(data) {
  const {messages, packageName, protoMsg} = this
  const request = new messages.Request()
  const typeUrlAny = `${packageName}.${protoMsg}`
  const requestAny = new messages[protoMsg]()
  const kyesAny = requestAny.toObject()
  const anyPb = new googleProtobufAnyPb.Any()
  
  Object.keys(data).forEach(key => {
    // 目前proto中extra为google.protobuf.Any类型
    if (key === 'extra') {
      Object.keys(data.extra).forEach(keyAny => {
        if (keyAny in kyesAny) {
          requestAny[`set${upperCase(keyAny)}`](data.extra[keyAny])
        }
      })
      anyPb.pack(requestAny.serializeBinary(), typeUrlAny)
    } else {
      // 枚举传对应的数字标识 
      request[`set${upperCase(key)}`](data[key])
    }
  })
  request.setExtra(anyPb)
  
  this.client.report(request, (err, res) => {
    if (err) {
      console.log('grpc error', err)
    }
  })
}

module.exports = Client