import {FileUpload} from '../../web_server/graphql/scalars';
import * as fs from 'fs';
import * as path from 'path';
import {createDirectory} from '../../utils/DirectoryFileUtil';

/**
 * const
 */
const uploadDir = './upload_files';

/**
 * FileUploadService
 */
export default class FileUploadService {
  /**
   * upload
   */
  public async upload(fileUpload: FileUpload): Promise<string> {
    console.log('FileUploadService upload()');
    try {
      // get stream
      const {createReadStream, filename} = await fileUpload;
      const stream = createReadStream();

      // set file path
      const dirPath = path.join(__dirname, `/../../.${uploadDir}`);
      const filePath = `${dirPath}/${filename}`;
      const resultPath = `${uploadDir}/${filename}`;

      // create directory
      createDirectory(dirPath);

      console.log('FileUploadService upload() result');
      console.log({
        filePath,
        resultPath,
      });

      // create file
      await stream.pipe(fs.createWriteStream(filePath));

      return resultPath;
    } catch (e) {
      console.error(e);

      return '';
    }
  }
}
