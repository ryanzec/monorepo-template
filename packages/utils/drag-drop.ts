import { UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove as dndkitArrayMove } from '@dnd-kit/sortable';
import find from 'lodash/find';

export interface DragDropItem {
  id: UniqueIdentifier;

  // this is for a generic item so when need to allow anything
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// this is for a generic item so when need to allow anything
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getContainerId = <TGroupedItems extends Record<string, any>>(items: TGroupedItems, itemId: UniqueIdentifier) => {
  return (Object.keys(items) as Array<keyof TGroupedItems>).find((key) => find(items[key], { id: itemId }));
};

const getItemIndex = <TItem extends DragDropItem>(items: TItem[], itemId?: UniqueIdentifier) => {
  return items.findIndex((item) => item.id === itemId);
};

// this is for a generic item so when need to allow anything
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const groupedArrayMove = <TGroupedItems extends Record<string, Array<Record<string, any>>>>(
  items: TGroupedItems,
  activeId: UniqueIdentifier,
  overId: UniqueIdentifier,
) => {
  const activeContainerKey = getContainerId(items, activeId);

  if (!activeContainerKey) {
    return items;
  }

  const itemGroup = items[activeContainerKey];
  const oldIndex = itemGroup.findIndex((item) => item.id === activeId);
  const newIndex = itemGroup.findIndex((item) => item.id === overId);

  items[activeContainerKey] = dndkitArrayMove(itemGroup, oldIndex, newIndex) as typeof itemGroup;

  return items;
};

// this is for a generic item so when need to allow anything
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const arrayMove = <TItems extends Array<Record<string, any>>>(
  items: TItems,
  activeId: UniqueIdentifier,
  overId: UniqueIdentifier,
) => {
  const oldIndex = items.findIndex((item) => item.id === activeId);
  const newIndex = items.findIndex((item) => item.id === overId);

  return dndkitArrayMove(items, oldIndex, newIndex) as TItems;
};

export const dragDropUtils = {
  getContainerId,
  getItemIndex,
  groupedArrayMove,
  arrayMove,
};
