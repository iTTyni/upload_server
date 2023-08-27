import {graphqlUploadExpress} from 'graphql-upload';
// import express from "express";
import * as express from 'express';
import {ApolloServer} from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import {typeDefs} from './graphql/types/ApolloServerTypes';
import {resolvers} from './apis/resolver';
import {Express} from 'express';

/**
 * main
 */
export const getServer = async (): Promise<Express> => {
  /**
   * Apollo Server
   */
  const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });

  /**
   * Express
   */
  const app = express();

  /**
   * graphql
   */
  const graphqlMaxFileSize = 100000000;
  const graphqlMaxFiles = 10;

  // use
  app.use(
    '/graphql',
    bodyParser.json({
      limit: '15mb',
      strict: false,
    }),
    graphqlUploadExpress({
      maxFileSize: graphqlMaxFileSize,
      maxFiles: graphqlMaxFiles,
      maxFieldSize: graphqlMaxFileSize,
    })
  );

  // use apollo server with express
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
  });

  return app;
};
