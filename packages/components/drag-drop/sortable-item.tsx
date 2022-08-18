import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { ReactNode } from 'react';

interface SortableItemProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  sortId: UniqueIdentifier;
  handleNode?: ReactNode;
}

const SortableItem = ({ sortId, handleNode, children, ...restOfProps }: SortableItemProps) => {
  // console.log('render sortable');

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: sortId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...restOfProps}>
      {children}
      <span {...attributes} {...listeners}>
        X{handleNode}
      </span>
    </div>
  );
};

export default SortableItem;
