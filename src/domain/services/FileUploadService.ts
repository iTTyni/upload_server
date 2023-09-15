import {FileUpload} from '../../web_server/graphql/scalars';
import * as fs from 'fs';
import * as path from 'path';
import {createDirectory} from '../../utils/DirectoryFileUtil';
import axios from 'axios';

/**
 * const
 */
const uploadDir = './upload_files';

/** function save data to db */
async function checkImage(name: string) {
  // save file details to image services
  const data: any = await axios
    .post(
      'http://localhost:8060/image',
      {
        query: `query{read_image_by_origin_name(name: "${name}"){_id filename originName extension isExist}}`,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then(response => response)
    .catch(error => {
      // Handle network or other errors
      console.error('Axios Error:', error);
    });
  return data?.data?.data.read_image_by_origin_name;
}
async function saveData(
  newFilename: string,
  filename: string,
  extension: string
) {
  // save file details to image services
  const data: any = await axios
    .post(
      'http://localhost:8060/image',
      {
        query: `mutation{write_image(image:{
      filename: "${newFilename}",
      originName: "${filename}",
      extension: "${extension}"
    }){_id filename originName extension isExist}}`,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then(response => response)
    .catch(error => {
      // Handle network or other errors
      console.error('Axios Error:', error);
    });
  return data?.data?.data?.write_image;
}

/**
 * FileUploadService
 */
export default class FileUploadService {
  /**
   * upload
   */
  public async upload(fileUpload: FileUpload): Promise<any> {
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

      const checkFileOnDb = await checkImage(filename);

      if (checkFileOnDb) return checkFileOnDb;
      else {
        // create directory
        createDirectory(dirPath);

        // create file if not exists
        await stream.pipe(fs.createWriteStream(filePath));

        const saveImage = await saveData(newFilename, filename, extension);

        return {...saveImage};
      }
    } catch (e) {
      console.error(e);

      return {error: 'Could not create file'};
    }
  }
}
