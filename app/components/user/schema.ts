import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  auth: Array,
  password: String,
  email: String,
});

userSchema.methods.speak = () => {
  console.log('new user', this);
};

export default mongoose.model('user', userSchema);