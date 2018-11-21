### 1.0

#### (1) 建立在 JavaScript 之上
#### (2) 事件触发、异步的
#### (3) **专为**数据密集型实时程序设计  

### 问答
**如何解释Node.js适合IO密集型不适合CPU密集型？** 

**答**： CPU密集型：计算等逻辑判断的操作，如：压缩、解压、加密和解密等。I/O密集型：存取设备，网络设施的读取操作，如：文件的存取，http等网络操作，数据库操作等。Node.js 执行是单线程的，如果执行 CPU 密集的任务就会阻塞后续代码，且单线程无法充分利用 CPU 多核资源。而异步 I/O 是多线程的，在工作线程上执行，不会阻塞执行线程，执行效率更高。

### Node 生成 https 秘钥、证书

**秘钥：openssl genrsa 1024 > weichaozhan.pem** 

**证书：openssl req -x509 -new -key weichaozhan.pem > weichaozhan-cert.pem**