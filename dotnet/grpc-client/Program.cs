#region Copyright notice and license

// Copyright 2019 The gRPC Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

#endregion

using System;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using Grpc.Core;
using static PersonService;

namespace GRPCClient
{
    public class Program
    {
        static void Main(string[] args)
        {
            //var channel = GrpcChannel.ForAddress("https://localhost:50051");
            var channel = new Channel("127.0.0.1", 50051, ChannelCredentials.Insecure);
            var client = new PersonServiceClient(channel);

            ListPersons(client).ConfigureAwait(false).GetAwaiter().GetResult();
            UpdatePerson(client).ConfigureAwait(false).GetAwaiter().GetResult();
            Subscribe(client).ConfigureAwait(false).GetAwaiter().GetResult();

            //await ServerStreamingCallExample(client);

            Console.WriteLine("Shutting down");
            Console.WriteLine("Press any key to exit...");
            Console.ReadKey();
        }

        private static async Task ListPersons(PersonServiceClient client)
        {
            var reply = await client.ListAsync(new Empty());
            Console.WriteLine("Persons: " + reply.Persons);

            var sw = Stopwatch.StartNew();
            var loops = 1000;
            for(var i=0;i<loops;i++) {
                reply = await client.ListAsync(new Empty());
                var person = reply.Persons[0];
                //Console.WriteLine(person.FirstName);
            }
            sw.Stop();
            Console.WriteLine($"Calling ListPersons {loops} times took {sw.ElapsedMilliseconds} ms.");
        }

        private static async Task UpdatePerson(PersonServiceClient client)
        {
            var reply = await client.UpdateAsync(new Person{ FirstName = "Jesper"});
            Console.WriteLine("Person updated!");
        }        

        private static async Task Subscribe(PersonServiceClient client)
        {

            using (var call = client.Subscribe(new Empty()))
            {
                while (await call.ResponseStream.MoveNext())
                {
                    var person = call.ResponseStream.Current;
                    Console.WriteLine("Got a new person:");
                    Console.WriteLine(person);
                }
            }            
            //Console.WriteLine("Persons: " + reply.);
        }                 
    }
}