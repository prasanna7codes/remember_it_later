import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//create the content table next

const UserModel = mongoose.model('User', userSchema);

export { UserModel };
