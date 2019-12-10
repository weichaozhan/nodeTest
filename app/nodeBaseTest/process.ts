import child_process from 'child_process';
import util from 'util';
import path from 'path';
import domain from 'domain';

/**
 * 复制文件
 */
function copy(source: string, target: string, cb: any) {
  // console.log(util.format('cp -r %s %s', source, target));
  child_process.exec(util.format('cp -r %s %s', source, target), null, cb);
}

copy(path.resolve('./fileSave/react-15.6.2.zip'), path.resolve('./fileSave/react-15.6.2.copy.zip'), () => {
  console.log('File copied !');
});

console.log('\n\n\n\nprocess.argv', process.argv);