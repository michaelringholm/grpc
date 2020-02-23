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
const PersonService = personProto.PersonService;


const PersonServiceStub = new PersonService('localhost:50051', grpc.credentials.createInsecure())
module.exports = PersonServiceStub