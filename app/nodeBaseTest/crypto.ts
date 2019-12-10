import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

/**
 * md5
 */
let hash = crypto.createHash('md5');
hash.update('123');
console.log('\n\n\nhash md5 hex', hash.digest('hex'));

hash = crypto.createHash('md5');
hash.update('123');
console.log('\n\n\nhash md5 base64', hash.digest('base64'));

hash = crypto.createHash('md5');
hash.update('123');
console.log('\n\n\nhash md5 latin1', hash.digest('latin1'));

/**
 * rsa
 */
const loadKey = (pathStr: string) => {
  return fs.readFileSync(path.resolve(pathStr));
};
const privKey = loadKey('./app/nodeBaseTest/rsa-prv.pem');
const pubKey = loadKey('./app/nodeBaseTest/rsa-pub.pem');
const msg = 'Hello World !';

console.log('\n\n\nprivKey.toString()', privKey.toString());

const encMsg = crypto.privateEncrypt(privKey, Buffer.from(msg, 'utf-8'));
console.log('\n\n\nencMsg', encMsg.toString('hex'));

const decMsg = crypto.publicDecrypt(pubKey, encMsg);
console.log('\n\n\ndecMsg', decMsg.toString());