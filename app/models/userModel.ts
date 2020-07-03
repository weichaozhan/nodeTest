import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, '请输入姓名！'],
  },
  account: {
    type: String,
    unique: true,
    required: [true, '请输入账号！'],
  },
  role: Array,
  password: {
    type: String,
    required: [true, '请输入密码！'],
    set: (val: string) => {
      return bcrypt.hashSync(val, 10);
    },
  },
  email: {
    type: String,
    unique: true,
    required: [true, '请输入邮箱！'],
  },
});

// userSchema.methods.speak = () => {
//   console.log('new user', this);
// };

export default mongoose.model('user', userSchema);