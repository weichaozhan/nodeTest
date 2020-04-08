import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: {
    type: String,
    required: [true, '缺少角色名称！'],
  },
  code: {
    type: String,
    unique: true,
    required: [true, '缺少角色 code！'],
  },
  auth: Array,
});

export default mongoose.model('role', roleSchema);