// package: 
// file: proto/hello.proto

var proto_hello_pb = require("../proto/hello_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var HelloWorldService = (function () {
  function HelloWorldService() {}
  HelloWorldService.serviceName = "HelloWorldService";
  return HelloWorldService;
}());

HelloWorldService.hello = {
  methodName: "hello",
  service: HelloWorldService,
  requestStream: false,
  responseStream: false,
  requestType: proto_hello_pb.HelloRequest,
  responseType: proto_hello_pb.HelloResponse
};

exports.HelloWorldService = HelloWorldService;

function HelloWorldServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

HelloWorldServiceClient.prototype.hello = function hello(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(HelloWorldService.hello, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.HelloWorldServiceClient = HelloWorldServiceClient;

