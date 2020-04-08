import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const authSchema = new Schema({
  name: {
    type: String,
    required: [true, '缺少名称！'],
  },
  path: {
    type: String,
    unique: true,
  },
  parent: {
    type: String,
  },
  actions: [String],
});

export default mongoose.model('auth', authSchema);