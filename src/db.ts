import mongoose, { Types } from 'mongoose';


//user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//tag schema
const tagSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true }
});

//content schema
const contentSchema = new mongoose.Schema({
  link: { type: String },
  type: { type: String,  required: true },
  title: { type: String, required: true },
  //tags: [{ type: Types.ObjectId, ref: 'Tag' }],
  userId: { type: Types.ObjectId, ref: 'User', required: true },
});


const UserModel = mongoose.model('User', userSchema);
const TagModel = mongoose.model('Tag', tagSchema);
const ContentModel = mongoose.model('Content', contentSchema);



export { UserModel,ContentModel };
