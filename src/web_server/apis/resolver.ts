import {
  MutationResolvers,
  QueryResolvers,
  Resolvers,
} from '../graphql/types/ApolloServerTypes';
import {HealthCheckQuery} from './resolvers/HealthCheckResolver';
import {FileUploadMutation} from './resolvers/FileUploadResolver';
import {GraphQLUpload} from 'graphql-upload';

const Query: QueryResolvers = {
  ...HealthCheckQuery,
};

const Mutation: MutationResolvers = {
  ...FileUploadMutation,
};

export const resolvers: Resolvers = {
  Query,
  Mutation,

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  FileUpload: GraphQLUpload,
};
