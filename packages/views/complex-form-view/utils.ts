export interface Todo {
  id: string;
  name: string;
  isCompleted: boolean;
}

export interface FormTodo extends Todo {
  formId: string;
}

// since these  are mapping to field name, need to use camelcase instead of snake case
export enum FieldId {
  TODOS = 'todos',
  TODOS_COMPLETED = 'todosCompleted',
}
