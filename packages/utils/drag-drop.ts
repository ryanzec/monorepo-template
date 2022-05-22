import { DropTargetMonitor } from 'react-dnd';

export enum DragDropType {
  COMPLEX_FORM_TODO = 'COMPLEX_FORM_TODO',
}

export interface ShouldChangePositionParams<T> {
  checkingBoundingRect: DOMRect;
  monitor: DropTargetMonitor<T, void>;
  draggingIndex: number;
  checkingIndex: number;
}

const shouldChangePosition = <T>({
  checkingBoundingRect,
  monitor,
  draggingIndex,
  checkingIndex,
}: ShouldChangePositionParams<T>): boolean => {
  const hoverMiddleY = ((checkingBoundingRect.bottom ?? 0) - (checkingBoundingRect.top ?? 0)) / 2;
  const hoverActualY = (monitor?.getClientOffset()?.y ?? 0) - (checkingBoundingRect.top ?? 0);

  // if dragging down, continue only when hover is smaller than middle Y
  if (draggingIndex < checkingIndex && hoverActualY < hoverMiddleY) return false;
  // if dragging up, continue only when hover is bigger than middle Y
  if (draggingIndex > checkingIndex && hoverActualY > hoverMiddleY) return false;

  return true;
};

export const dragDropUtils = {
  shouldChangePosition,
};
