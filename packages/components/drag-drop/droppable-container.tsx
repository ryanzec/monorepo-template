import { UniqueIdentifier, useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import React from 'react';

interface DroppableItem {
  id: UniqueIdentifier;
  [key: string]: any;
}

interface DroppableContainerProps<TItemData extends DroppableItem>
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  items: TItemData[];
  dropId: string;
}

const DroppableContainer = <TItemData extends DroppableItem>({
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
