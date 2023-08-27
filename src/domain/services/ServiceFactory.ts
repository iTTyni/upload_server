/**
 * services
 */
import FileUploadService from './FileUploadService';

const fileUploadService = new FileUploadService();

export default class ServiceFactory {
  public static getFileUploadService = () => fileUploadService;
}
