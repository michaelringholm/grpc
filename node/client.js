const grpc = require('grpc')
const PROTO_PATH = './person.proto'
const PersonService = grpc.load(PROTO_PATH).PersonService
const client = new PersonService('localhost:50051', grpc.credentials.createInsecure())
module.exports = client