import * as fs from 'fs';
import {dirname} from 'path';

/**
 * createDirectory
 */
export const createDirectory = (path: string): boolean => {
  try {
    const parent = dirname(path);

    if (!fs.existsSync(parent)) {
      fs.mkdirSync(parent, {recursive: true});
    }

    return true;
  } catch (e) {
    console.error(e);
  }

  return false;
};
