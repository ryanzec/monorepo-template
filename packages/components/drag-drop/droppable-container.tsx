import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import React from 'react';

import { DragDropItem } from '$/utils/drag-drop';

interface DroppableContainerProps<TItemData extends DragDropItem>
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  items: TItemData[];
  dropId: string;
}

const DroppableContainer = <TItemData extends DragDropItem>({
  dropId,
  items,
  className,
  ...restOfProps
}: DroppableContainerProps<TItemData>) => {
  const { setNodeRef } = useDroppable({
    id: dropId,
  });

  return (
    <SortableContext id={dropId} items={items} strategy={verticalListSortingStrategy}>
      <div ref={setNodeRef} className={className} {...restOfProps} />
    </SortableContext>
  );
};

export default DroppableContainer;
