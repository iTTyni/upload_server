import {QueryResolvers} from '../../graphql/types/ApolloServerTypes';
import HealthCheckController from '../../../domain/controllers/HealthCheckController';

export const HealthCheckQuery: QueryResolvers = {
  /**
   * ヘルスチェック
   */
  async healthCheck(_parent, {input}, context, _info) {
    console.log('HealthCheckQuery healthCheck()');

    // execute controller
    const controller = new HealthCheckController();
    const result = await controller.healthCheck();

    return {
      success: result,
    };
  },
};
