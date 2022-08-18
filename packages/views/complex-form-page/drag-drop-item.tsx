import { Identifier } from 'dnd-core';
import React, { memo, useRef } from 'react';
import { useDrag, useDrop, DragSourceMonitor, DropTargetMonitor } from 'react-dnd';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import Form from '$/components/form/form';
import { dragDropUtils, DragDropType } from '$/utils/drag-drop';
import { DragItem, FieldId, MoveItem, Todo } from '$/views/complex-form-page/common';
import { ComplexFormData } from '$/views/complex-form-page/complex-form-page';

export interface DragDropItemProps {
  item: Todo;
  register: UseFormRegister<ComplexFormData>;
  errors: FieldErrors<ComplexFormData>;
  index: number;
  moveItem: MoveItem;
  fieldId: FieldId;
}

export interface DragItemReturn {
  name: string;
  index: number;
  fieldId: FieldId;
}

// using memo since drag and drop and get laggy without it
export const DragDropItem = memo(({ fieldId, item, register, errors, index, moveItem }: DragDropItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [_dragData_, dragRef] = useDrag({
    type: DragDropType.COMPLEX_FORM_TODO,
    item: (): DragItemReturn => {
      return { name: item.name, index, fieldId };
    },
    collect: (monitor: DragSourceMonitor<DragItemReturn>) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [_spec_, dropRef] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: DragDropType.COMPLEX_FORM_TODO,
    hover: (item: DragItem, monitor: DropTargetMonitor<DragItem, void>) => {
      const draggingIndex = item.index;
      const draggingFieldId = item.fieldId;
      const checkingIndex = index;
      const checkingFieldId = fieldId;
      const indexesAreSame = draggingIndex === checkingIndex;
      const fieldsAreSame = draggingFieldId === checkingFieldId;
      const checkingBoundingRect = ref.current?.getBoundingClientRect();

      if ((indexesAreSame && fieldsAreSame) || !checkingBoundingRect) {
        if (process.env.NODE_ENV !== 'production') {
          if (!checkingBoundingRect) {
            console.error('getBoundingClientRect() was not found however that should not be possible, investigate?');
          }
        }

        return;
      }

      if (
        !dragDropUtils.shouldChangePosition<DragItem>({ checkingBoundingRect, monitor, draggingIndex, checkingIndex })
      ) {
        return;
      }

      moveItem(draggingIndex, draggingFieldId, checkingIndex, checkingFieldId);

      // while mutating data directly should never be done, in this case it is needed to be done since it seems like
      // the sortable functionality breaks. while react-dnd says it is for performance sake, even removing it in their
      // example causing the sorting functionality to break. I assume this is because the item that is passed to the
      // drag component does not update since the moving functionality work in an immutable ways (which is desired)
      // so we need to manually mutate the drag components copy of the item
      item.index = checkingIndex;
      item.fieldId = checkingFieldId;
    },
  });

  // since we want draggables to also be droppables (for sorting), we need to wrap them together
  dragRef(dropRef(ref));

  const fieldName = fieldId === FieldId.TODOS ? 'todos' : 'todosCompleted';

  return (
    <Form.InputContainer data-id="item" selfRef={ref} key={item.id}>
      <Form.Input type="text" property={`${fieldName}.${index}.name`} register={register} />
      <Form.Input type="checkbox" property={`${fieldName}.${index}.isCompleted`} register={register} /> Completed
      {errors[fieldName]?.[index]?.name && (
        <Form.ValidationMessage>{errors[fieldName]?.[index]?.name?.message}</Form.ValidationMessage>
      )}
    </Form.InputContainer>
  );
});

export default DragDropItem;
