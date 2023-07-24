import { SQLITE_DB_PATH } from '../../drizzle.config';
import fs from 'fs';

const clearDb = () => {
  if (fs.existsSync(SQLITE_DB_PATH)) {
    console.log('>> Trying to remove db ', SQLITE_DB_PATH);
    try {
      fs.unlinkSync(SQLITE_DB_PATH);
      console.log('>> DB removed successfully', SQLITE_DB_PATH);
    } catch (err) {
      console.error(err);
    }
  } else {
    console.log('>> DB does not exist', SQLITE_DB_PATH);
  }
};

clearDb();
