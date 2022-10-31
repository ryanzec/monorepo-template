export interface Todo {
  id: string;
  name: string;
  isCompleted: boolean;
}

export enum FieldId {
  TODOS = 'todos',
  TODOS_COMPLETED = 'todos-completed',
}

export interface DragItem {
  index: number;
  id: string;
  fieldId: FieldId;
  type: string;
}

export type MoveItem = (
  draggingId: number,
  draggingFieldId: string,
  checkingId: number,
  checkingFieldId: string,
) => void;
