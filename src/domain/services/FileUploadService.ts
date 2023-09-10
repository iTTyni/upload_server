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
  public async upload(fileUpload: FileUpload): Promise<{
    filename?: string;
    originName?: string;
    extension?: string;
    error?: Error
  }> {
    console.log('FileUploadService upload()');
    try {
      // get stream
      const {createReadStream, filename} = await fileUpload;
      const stream = createReadStream();

      // set file path
      const timestamp = Date.now();
      const dirPath = path.join(__dirname, `/../../.${uploadDir}`);
      const extension = path.extname(filename);
      const newFilename = `${timestamp.toString()}${extension}`;
      const filePath = `${dirPath}/${newFilename}`;
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

      return {
        filename: newFilename,
        originName: filename,
        extension,
      };
    } catch (e) {
      console.error(e);

      return {error: Error('Could not create file')}
    }
  }
}
