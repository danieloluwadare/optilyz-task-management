import { model, Schema } from 'mongoose';

// An interface that describes the properties that a User Document has
export interface Todo {
  title: string;
  description: string;
  dueTime: any;
  reminderTime: any;
  isCompleted: boolean;
}

const TodoSchema = new Schema<Todo>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueTime: {
    type: Date,
    required: true,
  },
  reminderTime: {
    type: Date,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

export default model<Todo>('Todo', TodoSchema);
