// package: 
// file: proto/hello.proto

import * as proto_hello_pb from "../proto/hello_pb";
import {grpc} from "@improbable-eng/grpc-web";

type HelloWorldServicehello = {
  readonly methodName: string;
  readonly service: typeof HelloWorldService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof proto_hello_pb.HelloRequest;
  readonly responseType: typeof proto_hello_pb.HelloResponse;
};

export class HelloWorldService {
  static readonly serviceName: string;
  static readonly hello: HelloWorldServicehello;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class HelloWorldServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  hello(
    requestMessage: proto_hello_pb.HelloRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: proto_hello_pb.HelloResponse|null) => void
  ): UnaryResponse;
  hello(
    requestMessage: proto_hello_pb.HelloRequest,
    callback: (error: ServiceError|null, responseMessage: proto_hello_pb.HelloResponse|null) => void
  ): UnaryResponse;
}

