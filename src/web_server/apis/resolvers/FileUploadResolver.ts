import {MutationResolvers} from '../../graphql/types/ApolloServerTypes';
import FileUploadController from '../../../domain/controllers/FileUploadController';

export const FileUploadMutation: MutationResolvers = {
  async fileUpload(_parent, {file}, context, _info) {
    console.log('FileUploadMutation fileUpload()');
    console.log({
      file,
    });

    // execute controller
    const controller = new FileUploadController();
    const result = await controller.upload(file.file);
    return {
      path: result,
    };
  },
};
