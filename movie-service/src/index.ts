import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import gql from 'graphql-tag';
import { buildSubgraphSchema } from '@apollo/subgraph';

const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.3", import: ["@key", "@shareable"])

  type Movie @key(fields: "id") @shareable {
    id: ID!
    title: String
  }

  type Query {
    movie(id: ID!): Movie
    movies: [Movie]
  }
`;



const movies = [
  {
    id: '1',
    title: 'Matrix',
  },
  {
    id: '2',
    title: 'Alice in Wonderland',
  },
];


const resolvers = {
  Query: {
    movies: () => movies,
    movie: (parent: any, args: any, context: any, info: any) => {
      return movies.find((movie) => movie.id === args.id);
    },
  },
  Movie: {
    __resolveReference(movie: any, { fetchByIds }: any) {
      return fetchByIds(movie.id);
    },
  },
};


const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4001 },
});

console.log(`🚀  Server ready at: ${url}`);