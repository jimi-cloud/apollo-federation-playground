import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const gateway = new ApolloGateway({
    pollIntervalInMs: 15000,
    supergraphSdl: new IntrospectAndCompose({
        subgraphs: [
            { name: 'movies', url: 'http://localhost:4001' },
            { name: 'reviews', url: 'http://localhost:4002' },
            { name: 'directors', url: 'http://localhost:8080'},
        ],
    }),
});

const server = new ApolloServer({ gateway });

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
});

console.log(`🚀 Gateway ready at ${url}`);