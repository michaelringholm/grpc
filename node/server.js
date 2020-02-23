const grpc = require('grpc')
const grpcProtoLoader = require('@grpc/proto-loader');
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
}
const packageDefinition = grpcProtoLoader.loadSync("./person.proto", options);
const personProto = grpc.loadPackageDefinition(packageDefinition);
const persons = [
  { id: '1', firstName: 'Michael', lastName: 'Sundgaard'},
  { id: '2', firstName: 'Michael', lastName: 'Hove'}
]
const server = new grpc.Server()
server.addService(
  personProto.PersonService.service, 
  {
    list: (call, callback) => 
    { 
      console.log("Server was called!"); 
      callback(null, persons);
    }
  }
  //list: (_, callback) => {   callback(null, persons) },
  
);

server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure())
console.log('Server running at http://127.0.0.1:50051')
server.start()