import { Identifier } from 'dnd-core';
import React, { memo } from 'react';
import { useDrop } from 'react-dnd';

import { DragDropType } from '$/utils/drag-drop';
import { FieldId, DragItem, MoveItem } from '$/views/complex-form-page/common';

export interface DragDropItemProps {
  moveItem: MoveItem;
  fieldId: FieldId;
}

// using memo since drag and drop and get laggy without it
export const EmptyDropContainer = memo(({ fieldId, moveItem }: DragDropItemProps) => {
  const [_spec_, dropRef] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: DragDropType.COMPLEX_FORM_TODO,
    hover: (item: DragItem) => {
      const draggingIndex = item.index;
      const checkingIndex = -1;
      const checkingFieldId = fieldId;

      moveItem(draggingIndex, item.fieldId, checkingIndex, checkingFieldId);

      // while mutating data directly should never be done, in this case it is needed to be done since it seems like
      // the sortable functionality breaks. while react-dnd says it is for performance sake, even removing it in their
      // example causing the sorting functionality to break. I assume this is because the item that is passed to the
      // drag component does not update since the moving functionality work in an immutable ways (which is desired)
      // so we need to manually mutate the drag components copy of the item
      // since this was an empty list, we set the index to 0
      item.index = 0;
      item.fieldId = checkingFieldId;
    },
  });

  return (
    <div ref={dropRef} data-id="empty-state">
      Nothing here yet...
    </div>
  );
});

export default EmptyDropContainer;
