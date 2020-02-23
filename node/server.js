const grpc = require('grpc')
const personProto = grpc.load('person.proto')
const persons = [
  { id: '1', firstName: 'Michael', lastName: 'Sundgaard'},
  { id: '2', firstName: 'Michael', lastName: 'Hove'}
]
const server = new grpc.Server()
server.addService(personProto.PersonService.service, {
  list: (_, callback) => {
      callback(null, persons)
  },
})

server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure())
console.log('Server running at http://127.0.0.1:50051')
server.start()