import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  DragOverEvent,
  closestCorners,
  pointerWithin,
  UniqueIdentifier,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import classnames from 'classnames';
import produce from 'immer';
import find from 'lodash/find';
import remove from 'lodash/remove';
import React, { memo, useCallback, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { v4 as uuid } from 'uuid';

import DragDrop from '$/components/drag-drop';
import styles from '$/components/drag-drop/drag-drop.stories.module.css';
import { dragDropUtils } from '$/utils/drag-drop';

export default {
  title: 'Packages/Components/DragDrop',
};

interface TodoItem {
  id: string;
  name: string;
  isComplete: boolean;
}

interface GroupedTodoItems {
  list1: TodoItem[];
  list2: TodoItem[];
}

const groupedTodoItems: GroupedTodoItems = { list1: [], list2: [] };

for (let i = 0; i < 50; i++) {
  if (i === 0) {
    groupedTodoItems.list2.push({
      id: `2:${i}`,
      isComplete: false,
      name: uuid(),
    });

    continue;
  }
  groupedTodoItems.list1.push({
    id: `1:${i}`,
    isComplete: false,
    name: uuid(),
  });
}

const startingTodoItems: TodoItem[] = [];

for (let i = 0; i < 3000; i++) {
  startingTodoItems.push({
    id: `3:${i}`,
    isComplete: false,
    name: uuid(),
  });
}

interface ItemDisplayProps {
  id: string;
  name: string;
}

const ItemDisplay = ({ id, name }: ItemDisplayProps) => {
  return (
    <DragDrop.SortableItem sortId={id}>
      <div className={styles.todoItem}>
        {id} - {name}
      </div>
    </DragDrop.SortableItem>
  );
};

interface ContainerDisplayProps {
  dropId: string;
  items: TodoItem[];
}

const ContainerDisplay = ({ dropId, items }: ContainerDisplayProps) => {
  return (
    <DragDrop.DroppableContainer dropId={dropId} items={items} className={styles.droppableContainer}>
      {items.map((todoItem) => (
        <ItemDisplay key={todoItem.id} id={todoItem.id} name={todoItem.name} />
      ))}
    </DragDrop.DroppableContainer>
  );
};

export const Sorting = () => {
  const [todoItems, setTodoItems] = useState<GroupedTodoItems>(groupedTodoItems);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setTodoItems((oldItems) =>
      produce(oldItems, (draft) => {
        return dragDropUtils.groupedArrayMove(draft, active.id, over.id);
      }),
    );
  }, []);

  return (
    <>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={todoItems.list1} strategy={verticalListSortingStrategy}>
          <div>
            {todoItems.list1.map((todoItem) => (
              <ItemDisplay key={todoItem.name} id={todoItem.id} name={todoItem.name} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </>
  );
};

export const SortingMultipleContainersSingleDataSource = () => {
  const [todoItems, setTodoItems] = useState<GroupedTodoItems>(groupedTodoItems);
  const [activeDragItem, setActiveDragItem] = useState<TodoItem | null>(null);
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
      const keys = Object.keys(todoItems) as Array<keyof typeof todoItems>;
      let item: TodoItem | null = null;

      for (let i = 0; i < keys.length; i++) {
        item = todoItems[keys[i]].find((item) => item.id === activeId) ?? null;

        if (item) {
          break;
        }
      }

      setActiveDragItem(() => item);
    },
    [todoItems],
  );

  // while it would be nice to have a utility method for this logic, getting a typescript generic to support any
  // data type that might be used seems relatively hard so just making the code inline for now
  const onDragOver = useCallback(
    (event: DragOverEvent) => {
      const activeContainerKey = dragDropUtils.getContainerId(todoItems, event.active.id);
      const overContainerKey = event.over ? dragDropUtils.getContainerId(todoItems, event.over.id) : undefined;
      const overIsDroppable = event.over?.id === 'list1' || event.over?.id === 'list2';

      if (overIsDroppable && activeContainerKey !== event.over?.id) {
        console.log(activeContainerKey, event.over?.id);

        if (event.over?.id === 'list1') {
          const activeItem = find(todoItems.list2, { id: event.active.id as string });

          if (!activeItem) {
            return;
          }

          setTodoItems((oldItems) => {
            return produce(oldItems, (draft) => {
              draft.list2 = draft.list2.filter((item) => item.id !== activeItem.id);
              draft.list1.push(activeItem);
            });
          });

          return;
        }

        const activeItem = find(todoItems.list1, { id: event.active.id as string });

        if (!activeItem) {
          return;
        }

        setTodoItems((oldItems) => {
          return produce(oldItems, (draft) => {
            draft.list1 = draft.list1.filter((item) => item.id !== activeItem.id);
            draft.list2.push(activeItem);
          });
        });

        return;
      }

      if (!activeContainerKey || !overContainerKey || activeContainerKey === overContainerKey) {
        return;
      }

      setTodoItems((oldItems) =>
        produce(oldItems, (draft) => {
          const activeItem = find(draft[activeContainerKey], { id: event.active.id as string });

          if (!activeItem) {
            return;
          }

          remove(draft[activeContainerKey], activeItem);
          draft[overContainerKey].push(activeItem);
        }),
      );
    },
    [todoItems],
  );

  // while it would be nice to have a utility method for this logic, getting a typescript generic to support any
  // data type that might be used seems relatively hard so just making the code inline for now
  const onDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setTodoItems((oldItems) =>
      produce(oldItems, (draft) => {
        return dragDropUtils.groupedArrayMove(draft, active.id, over.id);
      }),
    );
  }, []);

  return (
    <div className={styles.droppables}>
      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <ContainerDisplay dropId="list1" items={todoItems.list1} />
        <ContainerDisplay dropId="list2" items={todoItems.list2} />
        <DragOverlay>
          {activeDragItem && (
            <ItemDisplay key={activeDragItem.name} id={activeDragItem.id} name={activeDragItem.name} />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export const SortingMultipleContainersMultipleDataSources = () => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>(groupedTodoItems.list1);
  const [todoItems2, setTodoItems2] = useState<TodoItem[]>(groupedTodoItems.list2);
  const [activeDragItem, setActiveDragItem] = useState<TodoItem | null>(null);
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
      const groupedItems = { list1: todoItems, list2: todoItems2 };
      const keys = Object.keys(groupedItems) as Array<keyof typeof groupedItems>;
      let item: TodoItem | null = null;

      for (let i = 0; i < keys.length; i++) {
        item = groupedItems[keys[i]].find((item) => item.id === activeId) ?? null;

        if (item) {
          break;
        }
      }

      setActiveDragItem(() => item);
    },
    [todoItems, todoItems2],
  );

  // while it would be nice to have a utility method for this logic, getting a typescript generic to support any
  // data type that might be used seems relatively hard so just making the code inline for now
  const onDragOver = useCallback(
    (event: DragOverEvent) => {
      const activeId = event.active.id;
      const overId = event.over?.id;

      // these help avoid switch statement and usage of drag and drop utils that expect grouped items
      const groupedItems = { list1: todoItems, list2: todoItems2 };
      const groupedSetters = { list1: setTodoItems, list2: setTodoItems2 };

      const activeContainerKey = dragDropUtils.getContainerId(groupedItems, activeId);
      const overContainerKey = overId ? dragDropUtils.getContainerId(groupedItems, overId) : undefined;
      const overIsDroppable = overId === 'list1' || overId === 'list2';
      const switchToNewContainer = overIsDroppable || (overContainerKey && activeContainerKey !== overContainerKey);

      // casting here prevents a typescript error related to something that is really not an issues
      const newContainer = overContainerKey || (overId as keyof typeof groupedItems);

      if (!activeContainerKey || !newContainer || activeContainerKey === newContainer) {
        return;
      }

      if (switchToNewContainer) {
        const activeItem = find(groupedItems[activeContainerKey], { id: activeId as string });

        // we need to know where to place the item to avoid weird animation if placed at the bottom and then moved
        // to it's real position
        const newItemIndex = dragDropUtils.getItemIndex(groupedItems[newContainer], overId);

        if (!activeItem) {
          return;
        }

        groupedSetters[newContainer]((oldItems) => {
          return produce(oldItems, (draft) => {
            if (newItemIndex === -1) {
              draft.push(activeItem);

              return;
            }

            draft.splice(newItemIndex, 0, activeItem);
          });
        });
        groupedSetters[activeContainerKey]((oldItems) => {
          return produce(oldItems, (draft) => {
            return draft.filter((item) => item.id !== activeItem.id);
          });
        });
      }
    },
    [todoItems, todoItems2],
  );

  // while it would be nice to have a utility method for this logic, getting a typescript generic to support any
  // data type that might be used seems relatively hard so just making the code inline for now
  const onDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over || active.id === over.id) {
        return;
      }

      const groupedItems = { list1: todoItems, list2: todoItems2 };
      const groupedSetters = { list1: setTodoItems, list2: setTodoItems2 };
      const activeContainerKey = dragDropUtils.getContainerId(groupedItems, event.active.id);

      if (!activeContainerKey) {
        return;
      }

      groupedSetters[activeContainerKey]((oldItems) =>
        produce(oldItems, (draft) => {
          return dragDropUtils.arrayMove(draft, active.id, over.id);
        }),
      );
    },
    [todoItems, todoItems2],
  );

  return (
    <div className={styles.droppables}>
      <DndContext
        sensors={sensors}
        collisionDetection={pointerWithin}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <ContainerDisplay dropId="list1" items={todoItems} />
        <ContainerDisplay dropId="list2" items={todoItems2} />
        <DragOverlay>
          {activeDragItem && (
            <ItemDisplay key={activeDragItem.name} id={activeDragItem.id} name={activeDragItem.name} />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export const SortingVirtualized = () => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>(startingTodoItems);
  const [activeDragItem, setActiveDragItem] = useState<TodoItem | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onDragStart = useCallback(
    (event: DragStartEvent) => {
      setActiveDragItem(() => todoItems.find((item) => item.id === event.active.id) ?? null);
    },
    [todoItems],
  );

  const onDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setTodoItems((oldItems) =>
      produce(oldItems, (draft) => {
        return dragDropUtils.arrayMove(draft, active.id, over.id);
      }),
    );
  }, []);

  return (
    <>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <SortableContext items={todoItems} strategy={verticalListSortingStrategy}>
          <Virtuoso
            style={{ height: '400px' }}
            totalCount={todoItems.length}
            itemContent={(index) => (
              <ItemDisplay key={todoItems[index].name} id={todoItems[index].id} name={todoItems[index].name} />
            )}
          />
          <DragOverlay>
            {activeDragItem && (
              <ItemDisplay key={activeDragItem.name} id={activeDragItem.id} name={activeDragItem.name} />
            )}
          </DragOverlay>
        </SortableContext>
      </DndContext>
    </>
  );
};
