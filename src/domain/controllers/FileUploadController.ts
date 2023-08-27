import FileUploadService from '../services/FileUploadService';
import ServiceFactory from '../services/ServiceFactory';
import {FileUpload} from '../../web_server/graphql/scalars';

export default class FileUploadController {
  private fileUploadService: FileUploadService;

  constructor() {
    this.fileUploadService = ServiceFactory.getFileUploadService();
  }

  /**
   * upload
   */
  public async upload(fileUpload: FileUpload): Promise<string> {
    return await this.fileUploadService.upload(fileUpload);
  }
}
