import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'TITLE SCHEMA',
  },
  completed: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date(Date.now()).toString(),
  },
});

export default mongoose.models.Todo || mongoose.model('Todo', TodoSchema);
