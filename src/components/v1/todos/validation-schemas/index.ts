import { boolean, date, object, SchemaOf, string } from 'yup';
import { Todo } from '../models/todo';

const TodoSchema: SchemaOf<Todo> = object().shape({
  title: string().required(),
  description: string().required(),
  dueTime: string().required(),
  reminderTime: date().required(),
  isCompleted: boolean().required(),
});

export default TodoSchema;
