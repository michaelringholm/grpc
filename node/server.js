const grpc = require('grpc')
const personProto = grpc.load('../service-definitions/person.proto')
const persons = [
  { id: '1', firstName: 'Michael', lastName: 'Sundgaard'},
  { id: '2', firstName: 'Michael', lastName: 'Hove'}
]
const server = new grpc.Server()
server.addService(personProto.PersonService.service, {
  list: (_, callback) => {
      callback(null, persons)
  },
  update: (person, callback) => {
    //console.log(person);
    callback();
  },
  subscribe: (call) => {
    console.log("New client subscribing...");
    call.write({ id: '4', firstName: 'John', lastName: 'Master'});
    setTimeout(() => { call.write({ id: '5', firstName: 'Jane', lastName: 'Doe'}); }, 3000);    
    setTimeout(() => { call.write({ id: '6', firstName: 'Hans', lastName: 'Hansen'}); }, 8000);    
  }
})

server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure())
console.log('Server running at http://127.0.0.1:50051')
server.start()