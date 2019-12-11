import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  auth: Array,
  password: String,
  email: String,
});

export default mongoose.model('user', userSchema);