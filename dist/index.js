"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const v1_1 = __importDefault(require("uuid/v1"));
const test_1 = __importDefault(require("./test"));
setTimeout(() => {
    console.log('\nsecond --> ', 'test', test_1.default);
}, 5000);
async function testAsync() {
    const value = await new Promise((resolve) => {
        setTimeout(() => {
            resolve('I am res!');
        }, 2000);
    });
    console.log('\ntest', test_1.default, 'res', value);
}
testAsync();
const copy = () => {
    const copyFile = () => {
        let buffer = null;
        try {
            buffer = fs_1.default.readFileSync(path_1.default.resolve('./app/index.ts'));
            fs_1.default.writeFileSync(path_1.default.resolve(`./dist/${v1_1.default()}.ts`), buffer);
        }
        catch (err) {
            buffer = fs_1.default.readFileSync(path_1.default.resolve('./index.js'));
            fs_1.default.writeFileSync(path_1.default.resolve(`./dist/${v1_1.default()}.ts`), buffer);
        }
    };
    fs_1.default.open(path_1.default.resolve('./dist'), 'r+', (err, fd) => {
        if (!err) {
            copyFile();
        }
        else {
            fs_1.default.mkdir(path_1.default.resolve('./dist'), () => {
                copyFile();
            });
        }
    });
};
copy();
console.log('\n\nFile copied');
//# sourceMappingURL=index.js.map