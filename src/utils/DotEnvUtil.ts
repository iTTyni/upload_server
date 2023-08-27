import {config} from 'dotenv';

config({path: __dirname + '/../../.env'});

/**
 * DotEnv
 */
export default class DotEnvUtil {
  public static getServerConfig = () => {
    return {
      port: Number(process.env.NODE_APP_SERVER_PORT as string),
    };
  };

  public static graphqlClientMentorServerConfig = () => {
    const baseUrl = process.env
      .NODE_APP_GRAPHQL_CLIENT_MENTOR_SERVER_BASE_URL as string;
    const uri = process.env.NODE_APP_GRAPHQL_CLIENT_MENTOR_SERVER_URI as string;
    const jwtTokenSecret = process.env
      .NODE_APP_GRAPHQL_CLIENT_MENTOR_SERVER_JWT_SECRET as string;

    return {
      baseUrl,
      uri,
      url: `${baseUrl}${uri}`,
      jwtTokenSecret,
    };
  };
}
