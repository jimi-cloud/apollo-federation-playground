import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import gql from 'graphql-tag';

const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.3", import: ["@key", "@shareable", "@external", "@extends"])

  type Review @key(fields: "id") {
    id: ID!
    rating: Float
    comments: String
    movieId: ID!
    movie: Movie
  }

  type Movie @key(fields: "id") @extends {
    id: ID! @external
    reviews: [Review]
  }

  type Query {
    review(id: ID!): Review
    reviews: [Review]
  }
`;

const reviews = [
    {
        id: '1',
        rating: 5,
        comments: 'A masterpiece.',
        movieId: '1',
    },
    {
        id: '2',
        rating: 3,
        comments: 'Quite liked it.',
        movieId: '2',
    },
    {
        id: '3',
        rating: 4,
        comments: 'It was Okay.',
        movieId: '1',
    },
]

const resolvers = {
    Review: {
        __resolveReference(review: any, { fetchByReviewId }) {
            return fetchByReviewId(review.id);
        }
    },
    Movie: {
        reviews(movie: any) {
            return reviews.filter((review) => review.movieId === movie.id);
        },
    },
    Query: {
        review: (parent: any, { id }: any) => reviews.find((review) => review.id === id),
        reviews: () => reviews,
    },
};

const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4002 },
});

console.log(`🚀  Server ready at: ${url}`);