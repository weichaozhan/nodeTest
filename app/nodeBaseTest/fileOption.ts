import fs from 'fs';
import path from 'path';
import uuidV1 from 'uuid/v1';

const fileSaveDistName = 'fileSave';
const originFileURI = path.resolve('./app/index.ts');
const fileSaveURL = path.resolve(`./${fileSaveDistName}`);
const buildFileOutput = (name = '', ext = 'ts'): string => {
  return path.resolve(`./${fileSaveDistName}/${name}.${uuidV1()}.${ext}`);
};

function openFileSavedist(distOpen, callback) {
  fs.open(distOpen, 'r+', (err, fd) => {
    if (!err) {
      callback();
    } else {
      console.log('err, fd', err, fd);
      fs.mkdir(distOpen, () => {
        callback();
      });
    }
  });
}

/**
 * 小文件
 */
const copy = () => {
  const copyFile = () => {
    let buffer = null;

    try {
      buffer = fs.readFileSync(originFileURI);

      fs.writeFileSync(buildFileOutput(), buffer);
      console.log('\n\nFile copied');
    } catch(err) {
      console.log('copy err', err);
    }
  };

  openFileSavedist(fileSaveURL, copyFile);
};

/**
 * Stream
 */
const copyStream = (src: string, dst: string) => {
  function copyFile() {
    try {
      fs.createReadStream(src).pipe(fs.createWriteStream(dst, {
        flags: 'w+',
      }));
      console.log('copyStream file');
    } catch(err) {
      console.log('copyStream err', err);
    }
  }
  
  openFileSavedist(fileSaveURL, copyFile);
};

/**
 * Buffer
 */
const testBuffer = () => {
  const buffer = Buffer.from('Hello World!', 'utf-8');
  
  openFileSavedist(fileSaveURL, () => {
    fs.writeFileSync(buildFileOutput('text', 'txt'), buffer);
    console.log('buffer writed!');
  });
  
  console.log('buffer', buffer.toString('utf-8'));
};

/**
 * Stream detail
 */
const testStreamDetail = () => {
  openFileSavedist(fileSaveURL, () => {
    const rs = fs.createReadStream(path.resolve(`./${fileSaveDistName}/react-15.6.2.zip`));
    const ws = fs.createWriteStream(buildFileOutput('react-15.6.2', 'zip'));
  
    // rs.pipe(ws);
    rs.on('data', (chunk) => {
      // 写缓冲大于 highWaterMark, 暂停读取
      if (ws.write(chunk) === false) {
        rs.pause();
      }
    });

    ws.on('drain', (data) => {
      // 缓冲排空了，继续读取
      rs.resume();
    });
    
    rs.on('end', () => {
      ws.end();
    });
  });
};

/**
 * File System
 */
const testFileSystem = () => {
  fs.readdir(fileSaveURL, {
    withFileTypes: true,
  }, (err, files) => {
    if (!err) {
      console.log('readdir', files);
    } else {
      console.log('readdir err', err);
    }
  });
};

/**
 * path
 */
const testPath = () => {
  function replaceURI(url: string) {
    const reg = /\\/g; // windows path '\'
    return url.replace(reg, '/');
  }

  // replaceURI
  console.log('\nreplaceURI', replaceURI('./fileSave'));
  // path.normalize
  console.log('\npath.normalize', path.normalize('./////////fileSave'));
  // path.join
  console.log('\npath.join', path.join('bo', 'a/', '/re', '/ss'));
  // path.extname
  console.log('\npath.extname', path.extname('./test/node.js'));
};

/**
 * Traversal
 */
const testTraversal = () => {
  const pathStr = path.resolve('./');
  const dir = fs.readdirSync(pathStr);
  console.log('pathStr', pathStr);

  // Deep Preorder
  function deepTraversal(dir: string[], pathStr: string) {
    dir.forEach(d => {
      const dStr = path.join(pathStr, d);

      if (fs.statSync(dStr).isDirectory() && dStr.indexOf('node_modules') < 0) {
        deepTraversal(fs.readdirSync(dStr), dStr);
      } else {
        console.log('Deep Preorder', dStr);
      }
    });
  }
  deepTraversal(dir, pathStr);
};

/**
 * 文本编码
 * 
 * BOM用于标记一个文本文件使用Unicode编码，其本身是一个Unicode字符（"\uFEFF"），位于文本文件头部。在不同的Unicode编码下，BOM字符对应的二进制字节如下：
 * 
 * Bytes      Encoding
 * ----------------------------
 * FE FF       UTF16BE
 * FF FE       UTF16LE
 * EF BB BF    UTF8
 */
const encodeText = () => {
  // const bin = fs.readFileSync(path.resolve('./fileSave/index.html'));

  // if (bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
  //   console.log('bin', bin[0].toString(16));
  // }
  const ttt = fs.readFileSync(path.resolve('./fileSave/tttunicode.txt'), 'binary');

  fs.writeFileSync(path.resolve('./fileSave/tttunicodeWrite.txt'), ttt, 'binary');
};

const whichone = 'encodeText';
switch(whichone as string) {
  case 'copy':
    copy();
    break;
  case 'copyStream':
    copyStream(originFileURI, buildFileOutput()); 
    break;
  case 'testBuffer':
    testBuffer();
    break;
  case 'testStreamDetail':
    testStreamDetail();
    break;
  case 'testFileSystem':
    testFileSystem();
    break;
  case 'testPath':
    testPath();
    break;
  case 'testTraversal':
    testTraversal();
    break;
  case 'encodeText':
    encodeText();
    break;
  default: break;
}
