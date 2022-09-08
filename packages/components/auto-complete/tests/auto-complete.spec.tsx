import 'mocha';
import { expect } from 'chai';
import { useCombobox } from 'downshift';
import React from 'react';
import sinon from 'sinon';

import * as component from '$/components/auto-complete/auto-complete';

interface TestInterface {
  display: string;
  value: string;
}

describe.skip('auto complete component', () => {
  // describe('internalIsMultiSelect', () => {
  //   it('works when multi select', () => {
  //     const selectedItems: Array<TestInterface> = [];
  //
  //     expect(component.internalIsMultiSelect({ selectedItems })).to.equal(true);
  //   });
  //
  //   it('works when single select', () => {
  //     const selectedItems = undefined;
  //
  //     expect(component.internalIsMultiSelect({ selectedItems })).to.equal(false);
  //   });
  // });
  //
  // describe('internalFilterItems', () => {
  //   it('works', () => {
  //     const filterItemsReturns = [{ id: 'filter test' }];
  //     const filterItems = sinon.stub().returns(filterItemsReturns);
  //     const items: Array<TestInterface> = [{ display: 'test', value: 'test' }];
  //     const setAvailableItems = sinon.stub();
  //     const lastSelectedItem = undefined;
  //     const inputValue = '';
  //
  //     component.internalFilterItems({ filterItems, items, setAvailableItems, lastSelectedItem, inputValue });
  //
  //     expect(filterItems.callCount).to.equal(1);
  //     expect(filterItems.getCall(0).args).to.deep.equal([{ items, inputValue, selectedItem: lastSelectedItem }]);
  //     expect(setAvailableItems.callCount).to.equal(1);
  //     expect(setAvailableItems.getCall(0).args).to.deep.equal([filterItemsReturns]);
  //   });
  // });
  //
  // describe('internalDownshiftStateReducer', () => {
  //   describe('input change', () => {
  //     it('handles having input value', () => {
  //       const actionAndChanges = {
  //         changes: {
  //           inputValue: '',
  //         },
  //         type: useCombobox.stateChangeTypes.InputChange,
  //       };
  //       const isMultiSelect = false;
  //       const componentFilterItems = sinon.stub();
  //       const onItemSelected = sinon.stub();
  //       const itemToString = sinon.stub();
  //       const selectedItem = null;
  //       const forceSelection = true;
  //
  //       const results = component.internalDownshiftStateReducer({
  //         actionAndChanges,
  //         isMultiSelect,
  //         componentFilterItems,
  //         onItemSelected,
  //         itemToString,
  //         selectedItem,
  //         forceSelection,
  //       });
  //
  //       expect(results).to.deep.equal(actionAndChanges.changes);
  //       expect(componentFilterItems.callCount).to.equal(1);
  //       expect(componentFilterItems.getCall(0).args).to.deep.equal([actionAndChanges.changes.inputValue]);
  //       expect(onItemSelected.callCount).to.equal(0);
  //       expect(itemToString.callCount).to.equal(1);
  //       expect(itemToString.getCall(0).args).to.deep.equal([null]);
  //     });
  //
  //     it('handles not having input value', () => {
  //       const actionAndChanges = {
  //         changes: {},
  //         type: useCombobox.stateChangeTypes.InputChange,
  //       };
  //       const isMultiSelect = false;
  //       const componentFilterItems = sinon.stub();
  //       const onItemSelected = sinon.stub();
  //       const itemToString = sinon.stub();
  //       const selectedItem = null;
  //       const forceSelection = true;
  //
  //       const results = component.internalDownshiftStateReducer({
  //         actionAndChanges,
  //         isMultiSelect,
  //         componentFilterItems,
  //         onItemSelected,
  //         itemToString,
  //         selectedItem,
  //         forceSelection,
  //       });
  //
  //       expect(results).to.deep.equal(actionAndChanges.changes);
  //       expect(componentFilterItems.callCount).to.equal(0);
  //       expect(onItemSelected.callCount).to.equal(0);
  //       expect(itemToString.callCount).to.equal(1);
  //       expect(itemToString.getCall(0).args).to.deep.equal([null]);
  //     });
  //   });
  //
  //   describe('escape key', () => {
  //     it('handle single select mode', () => {
  //       const actionAndChanges = {
  //         changes: {
  //           inputValue: 't',
  //         },
  //         type: useCombobox.stateChangeTypes.InputKeyDownEscape,
  //       };
  //       const isMultiSelect = false;
  //       const componentFilterItems = sinon.stub();
  //       const onItemSelected = sinon.stub();
  //       const itemToString = sinon.stub();
  //       const selectedItem = null;
  //       const forceSelection = true;
  //
  //       const results = component.internalDownshiftStateReducer({
  //         actionAndChanges,
  //         isMultiSelect,
  //         componentFilterItems,
  //         onItemSelected,
  //         itemToString,
  //         selectedItem,
  //         forceSelection,
  //       });
  //
  //       expect(results).to.deep.equal({ ...actionAndChanges.changes, inputValue: '' });
  //       expect(componentFilterItems.callCount).to.equal(0);
  //       expect(onItemSelected.callCount).to.equal(1);
  //       expect(onItemSelected.getCall(0).args).to.deep.equal([null]);
  //       expect(itemToString.callCount).to.equal(1);
  //       expect(itemToString.getCall(0).args).to.deep.equal([null]);
  //     });
  //
  //     it('handle multi select mode', () => {
  //       const actionAndChanges = {
  //         changes: {
  //           inputValue: 't',
  //         },
  //         type: useCombobox.stateChangeTypes.InputKeyDownEscape,
  //       };
  //       const isMultiSelect = true;
  //       const componentFilterItems = sinon.stub();
  //       const onItemSelected = sinon.stub();
  //       const itemToString = sinon.stub();
  //       const selectedItem = null;
  //       const forceSelection = true;
  //
  //       const results = component.internalDownshiftStateReducer({
  //         actionAndChanges,
  //         isMultiSelect,
  //         componentFilterItems,
  //         onItemSelected,
  //         itemToString,
  //         selectedItem,
  //         forceSelection,
  //       });
  //
  //       expect(results).to.deep.equal({ ...actionAndChanges.changes, inputValue: '' });
  //       expect(componentFilterItems.callCount).to.equal(0);
  //       expect(onItemSelected.callCount).to.equal(0);
  //       expect(itemToString.callCount).to.equal(0);
  //     });
  //   });
  //
  //   describe('enter key', () => {
  //     it('handles having no selected item with force selection', () => {
  //       const actionAndChanges = {
  //         changes: {
  //           inputValue: 't',
  //         },
  //         type: useCombobox.stateChangeTypes.InputKeyDownEnter,
  //       };
  //       const isMultiSelect = false;
  //       const componentFilterItems = sinon.stub();
  //       const onItemSelected = sinon.stub();
  //       const itemToString = sinon.stub();
  //       const selectedItem = null;
  //       const forceSelection = true;
  //
  //       const results = component.internalDownshiftStateReducer({
  //         actionAndChanges,
  //         isMultiSelect,
  //         componentFilterItems,
  //         onItemSelected,
  //         itemToString,
  //         selectedItem,
  //         forceSelection,
  //       });
  //
  //       expect(results).to.deep.equal({ ...actionAndChanges.changes, inputValue: '' });
  //       expect(componentFilterItems.callCount).to.equal(0);
  //       expect(onItemSelected.callCount).to.equal(0);
  //       expect(itemToString.callCount).to.equal(1);
  //       expect(itemToString.getCall(0).args).to.deep.equal([null]);
  //     });
  //
  //     it('handles having no selected item without force selection', () => {
  //       const actionAndChanges = {
  //         changes: {
  //           inputValue: 't',
  //         },
  //         type: useCombobox.stateChangeTypes.InputKeyDownEnter,
  //       };
  //       const isMultiSelect = false;
  //       const componentFilterItems = sinon.stub();
  //       const onItemSelected = sinon.stub();
  //       const itemToString = sinon.stub();
  //       const selectedItem = null;
  //       const forceSelection = false;
  //
  //       const results = component.internalDownshiftStateReducer({
  //         actionAndChanges,
  //         isMultiSelect,
  //         componentFilterItems,
  //         onItemSelected,
  //         itemToString,
  //         selectedItem,
  //         forceSelection,
  //       });
  //
  //       expect(results).to.deep.equal(actionAndChanges.changes);
  //       expect(componentFilterItems.callCount).to.equal(0);
  //       expect(onItemSelected.callCount).to.equal(1);
  //       expect(onItemSelected.getCall(0).args).to.deep.equal([
  //         { display: actionAndChanges.changes.inputValue, value: actionAndChanges.changes.inputValue },
  //       ]);
  //       expect(itemToString.callCount).to.equal(1);
  //       expect(itemToString.getCall(0).args).to.deep.equal([null]);
  //     });
  //
  //     it('handles having selected item for single select', () => {
  //       const actionAndChanges = {
  //         changes: {
  //           inputValue: 't',
  //           selectedItem: { display: 'test', value: 'test' },
  //         },
  //         type: useCombobox.stateChangeTypes.InputKeyDownEnter,
  //       };
  //       const isMultiSelect = false;
  //       const componentFilterItems = sinon.stub();
  //       const onItemSelected = sinon.stub();
  //       const itemToStringReturn = 'item to string';
  //       const itemToString = sinon.stub().returns(itemToStringReturn);
  //       const selectedItem = null;
  //       const forceSelection = true;
  //
  //       const results = component.internalDownshiftStateReducer({
  //         actionAndChanges,
  //         isMultiSelect,
  //         componentFilterItems,
  //         onItemSelected,
  //         itemToString,
  //         selectedItem,
  //         forceSelection,
  //       });
  //
  //       expect(results).to.deep.equal({ ...actionAndChanges.changes, inputValue: itemToStringReturn, isOpen: false });
  //       expect(componentFilterItems.callCount).to.equal(1);
  //       expect(componentFilterItems.getCall(0).args).to.deep.equal([]);
  //       expect(onItemSelected.callCount).to.equal(1);
  //       expect(onItemSelected.getCall(0).args).to.deep.equal([actionAndChanges.changes.selectedItem]);
  //       expect(itemToString.callCount).to.equal(1);
  //       expect(itemToString.getCall(0).args).to.deep.equal([actionAndChanges.changes.selectedItem]);
  //     });
  //
  //     it('handles having selected item for multi select', () => {
  //       const actionAndChanges = {
  //         changes: {
  //           inputValue: 't',
  //         },
  //         type: useCombobox.stateChangeTypes.InputKeyDownEnter,
  //       };
  //       const isMultiSelect = true;
  //       const componentFilterItems = sinon.stub();
  //       const onItemSelected = sinon.stub();
  //       const itemToStringReturn = 'item to string';
  //       const itemToString = sinon.stub().returns(itemToStringReturn);
  //       const selectedItem = { display: 'test', value: 'test' };
  //       const forceSelection = true;
  //
  //       const results = component.internalDownshiftStateReducer({
  //         actionAndChanges,
  //         isMultiSelect,
  //         componentFilterItems,
  //         onItemSelected,
  //         itemToString,
  //         selectedItem,
  //         forceSelection,
  //       });
  //
  //       expect(results).to.deep.equal({ ...actionAndChanges.changes, inputValue: '', isOpen: true });
  //       expect(componentFilterItems.callCount).to.equal(1);
  //       expect(componentFilterItems.getCall(0).args).to.deep.equal(['', selectedItem]);
  //       expect(onItemSelected.callCount).to.equal(1);
  //       expect(onItemSelected.getCall(0).args).to.deep.equal([selectedItem]);
  //       expect(itemToString.callCount).to.equal(0);
  //     });
  //   });
  //
  //   it('handles all other events', () => {
  //     const actionAndChanges = {
  //       changes: {
  //         inputValue: 't',
  //       },
  //       type: useCombobox.stateChangeTypes.FunctionOpenMenu,
  //     };
  //     const isMultiSelect = true;
  //     const componentFilterItems = sinon.stub();
  //     const onItemSelected = sinon.stub();
  //     const itemToStringReturn = 'item to string';
  //     const itemToString = sinon.stub().returns(itemToStringReturn);
  //     const selectedItem = { display: 'test', value: 'test' };
  //     const forceSelection = true;
  //
  //     const results = component.internalDownshiftStateReducer({
  //       actionAndChanges,
  //       isMultiSelect,
  //       componentFilterItems,
  //       onItemSelected,
  //       itemToString,
  //       selectedItem,
  //       forceSelection,
  //     });
  //
  //     expect(results).to.deep.equal(actionAndChanges.changes);
  //     expect(componentFilterItems.callCount).to.equal(0);
  //     expect(onItemSelected.callCount).to.equal(0);
  //     expect(itemToString.callCount).to.equal(0);
  //   });
  // });
  //
  // describe('internalOnFocus', () => {
  //   it('should auto focus', () => {
  //     const componentFilterItems = sinon.stub();
  //     const showItemsOnFocus = true;
  //     const openMenu = sinon.stub();
  //
  //     component.internalOnFocus({ componentFilterItems, showItemsOnFocus, openMenu });
  //
  //     expect(componentFilterItems.callCount).to.equal(1);
  //     expect(componentFilterItems.getCall(0).args).to.deep.equal(['']);
  //     expect(openMenu.callCount).to.equal(1);
  //     expect(openMenu.getCall(0).args).to.deep.equal([]);
  //   });
  //
  //   it('should not auto focus', () => {
  //     const componentFilterItems = sinon.stub();
  //     const showItemsOnFocus = false;
  //     const openMenu = sinon.stub();
  //
  //     component.internalOnFocus({ componentFilterItems, showItemsOnFocus, openMenu });
  //
  //     expect(componentFilterItems.callCount).to.equal(1);
  //     expect(componentFilterItems.getCall(0).args).to.deep.equal(['']);
  //     expect(openMenu.callCount).to.equal(0);
  //   });
  // });
});
