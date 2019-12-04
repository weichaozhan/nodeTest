import fs from 'fs';
import path from 'path';
import uuidV1 from 'uuid/v1';

import './test';

const copy = () => {
  const copyFile = () => {
    let buffer = null;

    try {
      buffer = fs.readFileSync(path.resolve('./app/index.ts'));

      fs.writeFileSync(path.resolve(`./dist/${uuidV1()}.ts`), buffer);
    } catch(err) {
      buffer = fs.readFileSync(path.resolve('./index.js'));

      fs.writeFileSync(path.resolve(`./dist/${uuidV1()}.ts`), buffer);
    }
  };

  fs.open(path.resolve('./dist'), 'r+', (err, fd) => {
    if (!err) {
      copyFile();
    } else {
      fs.mkdir(path.resolve('./dist'), () => {
        copyFile();
      });
    }
  });
};

copy();


console.log('\n\nFile copied');
