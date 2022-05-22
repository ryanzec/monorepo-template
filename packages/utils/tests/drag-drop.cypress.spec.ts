import { dragDropUtils } from '$/utils/drag-drop';
import { DropTargetMonitor } from 'react-dnd';

describe('drag drop utils', () => {
  it('should change position works properly when dragging down before half way', () => {
    const top = 100;
    const bottom = 150;
    const y = 110;
    const params = {
      checkingBoundingRect: {
        bottom,
        top,
      } as DOMRect,
      monitor: {
        getClientOffset: () => ({
          y,
        }),
      } as unknown as DropTargetMonitor<any, void>,
      draggingIndex: 1,
      // checking index being higher simulate dragging down
      checkingIndex: 2,
    };

    const results = dragDropUtils.shouldChangePosition<any>(params);

    expect(results).to.equal(false);
  });

  it('should change position works properly when dragging down after half way', () => {
    const top = 100;
    const bottom = 150;
    const y = 140;
    const params = {
      checkingBoundingRect: {
        bottom,
        top,
      } as DOMRect,
      monitor: {
        getClientOffset: () => ({
          y,
        }),
      } as unknown as DropTargetMonitor<any, void>,
      draggingIndex: 1,
      // checking index being higher simulate dragging down
      checkingIndex: 2,
    };

    const results = dragDropUtils.shouldChangePosition<any>(params);

    expect(results).to.equal(true);
  });

  it('should change position works properly when dragging up before half way', () => {
    const top = 100;
    const bottom = 150;
    const y = 140;
    const params = {
      checkingBoundingRect: {
        bottom,
        top,
      } as DOMRect,
      monitor: {
        getClientOffset: () => ({
          y,
        }),
      } as unknown as DropTargetMonitor<any, void>,
      draggingIndex: 1,
      // checking index being lower simulate dragging up
      checkingIndex: 0,
    };

    const results = dragDropUtils.shouldChangePosition<any>(params);

    expect(results).to.equal(false);
  });

  it('should change position works properly when dragging up after half way', () => {
    const top = 100;
    const bottom = 150;
    const y = 110;
    const params = {
      checkingBoundingRect: {
        bottom,
        top,
      } as DOMRect,
      monitor: {
        getClientOffset: () => ({
          y,
        }),
      } as unknown as DropTargetMonitor<any, void>,
      draggingIndex: 1,
      // checking index being lower simulate dragging up
      checkingIndex: 0,
    };

    const results = dragDropUtils.shouldChangePosition<any>(params);

    expect(results).to.equal(true);
  });
});
