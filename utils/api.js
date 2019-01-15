import ServerConf from '../conf/conf.js';
import snackCase from '../utils/util.js';
const apiVersion = 'v1';

const api = {
  loginAction(iv, code, encryptedData) {
    post(url, iv, code, encryptedData);
  },
  getStudentScores(){},
};