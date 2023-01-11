import type { FieldErrors } from 'react-hook-form/dist/types/errors';

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import React, { useCallback, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

import { dragDropUtils } from '$/utils/drag-drop';
import { ComplexFormData } from '$/views/complex-form-view/complex-form-view';
import styles from '$/views/complex-form-view/complex-form-view.module.css';
import ContainerDisplay from '$/views/complex-form-view/container-display';
import { FieldId, FormTodo } from '$/views/complex-form-view/utils';

export interface TodoItemsProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  todoItems: FormTodo[];
  completedTodoItems: FormTodo[];
  moveItem: (draggingIndex: number, draggingFieldId: FieldId, checkingIndex: number, checkingFieldId: FieldId) => void;
  register: UseFormRegister<ComplexFormData>;
  errors: FieldErrors<ComplexFormData>;
}

const TodoItems = ({
  todoItems,
  completedTodoItems,
  moveItem,
  register,
  errors: _errors_,
  ...restOfProps
}: TodoItemsProps) => {
  const [activeDragItem, setActiveDragItem] = useState<FormTodo | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // while it would be nice to have a utility method for this logic, getting a typescript generic to support any
  // data type that might be used seems relatively hard so just making the code inline for now
  const onDragStart = useCallback(
    (event: DragStartEvent) => {
      const activeId = event.active.id;
      const groupedItems = { list1: todoItems, list2: completedTodoItems };
      const keys = Object.keys(groupedItems) as Array<keyof typeof groupedItems>;
      let item: FormTodo | null = null;

      for (let i = 0; i < keys.length; i++) {
        item = groupedItems[keys[i]].find((item) => item.id === activeId) ?? null;

        if (item) {
          break;
        }
      }

      setActiveDragItem(() => item);
    },
    [todoItems, completedTodoItems],
  );

  // while it would be nice to have a utility method for this logic, getting a typescript generic to support any
  // data type that might be used seems relatively hard so just making the code inline for now
  const onDragOver = useCallback(
    (event: DragOverEvent) => {
      const activeId = event.active.id;
      const overId = event.over?.id;

      if (!overId) {
        return;
      }

      // these help avoid switch statement and usage of drag and drop utils that expect grouped items
      const groupedItems = { [FieldId.TODOS]: todoItems, [FieldId.TODOS_COMPLETED]: completedTodoItems };

      const activeContainerKey = dragDropUtils.getContainerId(groupedItems, activeId);

      if (!activeContainerKey) {
        return;
      }

      const overContainerKey = overId ? dragDropUtils.getContainerId(groupedItems, overId) : undefined;
      const overIsDroppable = overId === FieldId.TODOS || overId === FieldId.TODOS_COMPLETED;

      // casting here prevents a typescript error related to something that is really not an issues
      const newContainer = overContainerKey || (overId as keyof typeof groupedItems);

      const activeIndex = dragDropUtils.getItemIndex(groupedItems[activeContainerKey], activeId);

      // if we are over a droppable that mean we should just be appending the item
      const overIndex = overIsDroppable
        ? groupedItems[newContainer].length
        : dragDropUtils.getItemIndex(groupedItems[newContainer], overId);

      if (activeId === overId && activeContainerKey === newContainer) {
        return;
      }

      moveItem(activeIndex, activeContainerKey, overIndex, newContainer);
    },
    [todoItems, completedTodoItems, moveItem],
  );

  // while it would be nice to have a utility method for this logic, getting a typescript generic to support any
  // data type that might be used seems relatively hard so just making the code inline for now
  const onDragEnd = useCallback(
    (event: DragEndEvent) => {
      const activeId = event.active.id;
      const overId = event.over?.id;

      if (!overId || activeId === overId) {
        return;
      }

      const groupedItems = { [FieldId.TODOS]: todoItems, [FieldId.TODOS_COMPLETED]: completedTodoItems };
      const activeContainerKey = dragDropUtils.getContainerId(groupedItems, activeId);

      if (!activeContainerKey) {
        return;
      }

      const activeIndex = dragDropUtils.getItemIndex(groupedItems[activeContainerKey], activeId);
      const overIndex = dragDropUtils.getItemIndex(groupedItems[activeContainerKey], overId);

      moveItem(activeIndex, activeContainerKey, overIndex, activeContainerKey);
    },
    [todoItems, completedTodoItems, moveItem],
  );

  return (
    <div className={styles.todos} {...restOfProps}>
      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <ContainerDisplay dropId={FieldId.TODOS} items={todoItems} register={register} />
        <ContainerDisplay dropId={FieldId.TODOS_COMPLETED} items={completedTodoItems} register={register} />
        <DragOverlay>{activeDragItem && <div>{activeDragItem.id}</div>}</DragOverlay>
      </DndContext>
    </div>
  );
};

export default TodoItems;
