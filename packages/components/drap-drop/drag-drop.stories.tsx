import React, { useCallback, useRef, useState } from 'react';
import produce from 'immer';
import { useDrag, useDrop } from 'react-dnd';
import { Identifier } from 'dnd-core';
import * as dragDropUtils from '$utils/drag-drop';
import styled from '@emotion/styled';
import { v4 as uuid } from 'uuid';

export default {
  title: 'Packages/Components/Drag Drop',
};

interface TodoItem {
  name: string;
  isComplete: boolean;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

interface SortingListItemProps {
  item: TodoItem;
  index: number;
  moveItem: (draggingIndex: number, checkingIndex: number) => void;
}

const TODO_ITEM_TYPE = 'todo-item';

const TodoItem = styled.div`
  border: 1px solid black;
  padding: 5px;
  margin: 2px;
`;

// the sorting example was based on this: https://react-dnd.github.io/react-dnd/examples/sortable/stress-test
// while that example referenced includes the use of request animation frame, in my testing, that did not added
// much performance gain, most if not all of the performance gain came from memoizing this component (which makes
// sense), if you want to more than 3000 sortable items (at which might, I think re-designing the UX might be needed)
// you should look into virtualized lists
export const SortingListItem = React.memo(({ item, index, moveItem }: SortingListItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // useDrag - the list item is draggable
  const [{ isDragging }, dragRef] = useDrag({
    type: TODO_ITEM_TYPE,
    item: () => {
      return { name: item.name, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // useDrop - the list item is also a drop area
  const [_spec_, dropRef] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: TODO_ITEM_TYPE,
    hover: (item, monitor) => {
      const draggingIndex = item.index;
      const checkingIndex = index;
      const indexesAreSame = draggingIndex === checkingIndex;
      const checkingBoundingRect = ref.current?.getBoundingClientRect();

      if (indexesAreSame || !checkingBoundingRect) {
        return;
      }

      if (
        !dragDropUtils.shouldChangePosition<DragItem>({ checkingBoundingRect, monitor, draggingIndex, checkingIndex })
      ) {
        return;
      }

      moveItem(draggingIndex, checkingIndex);

      // while mutating data directly should never be done, in this case it is needed to be done since it seems like
      // the sortable functionality breaks. while react-dnd says it is for performance sake, even removing it in their
      // example causing the sorting functionality to break. I assume this is because the item that is passed to the
      // drag component does not update since the moving functionality work in an immutable ways (which is desired)
      // so we need to manually mutate the drag components copy of the item
      item.index = checkingIndex;
    },
  });

  // since we want draggables to also be droppables (for sorting), we need to wrap them together
  dragRef(dropRef(ref));

  const opacity = isDragging ? 0 : 1;
  return (
    <TodoItem ref={ref} style={{ opacity }}>
      {item.name} - {item.isComplete}
    </TodoItem>
  );
});

const startingTodoItems: TodoItem[] = [];

for (let i = 0; i < 3000; i++) {
  startingTodoItems.push({
    isComplete: false,
    name: uuid(),
  });
}

export const Sorting = () => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>(startingTodoItems);

  const moveTodoItem = useCallback((draggingIndex: number, checkingIndex: number) => {
    setTodoItems((previousTodoItems) => {
      return produce(previousTodoItems, (draftCards) => {
        const newHoverItem = { ...draftCards[draggingIndex] };

        draftCards[draggingIndex] = { ...draftCards[checkingIndex] };
        draftCards[checkingIndex] = newHoverItem;
      });
    });
  }, []);

  const renderTodoItem = useCallback(
    (card: TodoItem, index: number) => {
      return <SortingListItem key={card.name} index={index} item={card} moveItem={moveTodoItem} />;
    },
    [moveTodoItem],
  );

  return (
    <>
      <div>{todoItems.map((todoItem, i) => renderTodoItem(todoItem, i))}</div>
    </>
  );
};

// export const SwapBetweenLists = () => {
//   const { items, setItems, isDragging, setIsDragging, currentDropId } = useDragDropList<TodoItem>([
//     {
//       name: 'Item 1',
//       isComplete: false,
//     },
//     {
//       name: 'Item 2',
//       isComplete: false,
//     },
//     {
//       name: 'Item 3',
//       isComplete: false,
//     },
//     {
//       name: 'Item 4',
//       isComplete: true,
//     },
//     {
//       name: 'Item 5',
//       isComplete: true,
//     },
//     {
//       name: 'Item 6',
//       isComplete: true,
//     },
//   ]);
//
//   const notCompletedItems = useMemo(() => {
//     return items.filter((item) => !item.isComplete);
//   }, [items]);
//
//   const completedItems = useMemo(() => {
//     return items.filter((item) => item.isComplete);
//   }, [items]);
//
//   const onNotCompleteDrop = useCallback(
//     (droppedItem: DroppedTodoItem) => {
//       const index = items.findIndex((item) => item.name === droppedItem.item.name);
//
//       setItems(
//         produce(items, (draft) => {
//           draft[index].isComplete = false;
//         }),
//       );
//     },
//     [items, setItems],
//   );
//
//   const onCompleteDrop = useCallback(
//     (droppedItem: DroppedTodoItem) => {
//       const index = items.findIndex((item) => item.name === droppedItem.item.name);
//
//       setItems(
//         produce(items, (draft) => {
//           draft[index].isComplete = true;
//         }),
//       );
//     },
//     [items, setItems],
//   );
//
//   return (
//     <>
//       {isDragging && (
//         <div>
//           <strong>IS DRAGGING ({currentDropId})</strong>
//         </div>
//       )}
//       <div>----- todo list1 -----</div>
//      <DragDropContainer dropId="target2" targetType="test2" onDrop={onNotCompleteDrop} setIsDragging={setIsDragging}>
//         {notCompletedItems.map((item) => {
//           return (
//             <DragDropItem key={item.name} item={{ item }} sourceType="test2" setIsDragging={setIsDragging}>
//               {item.name}
//             </DragDropItem>
//           );
//         })}
//       </DragDropContainer>
//       <div>----- todo list2 -----</div>
//       <DragDropContainer dropId="target3" targetType="test2" onDrop={onCompleteDrop} setIsDragging={setIsDragging}>
//         {completedItems.map((item) => {
//           return (
//             <DragDropItem key={item.name} item={{ item }} sourceType="test2" setIsDragging={setIsDragging}>
//               {item.name}
//             </DragDropItem>
//           );
//         })}
//       </DragDropContainer>
//     </>
//   );
// };

Sorting.parameters = { controls: { disable: true } };
