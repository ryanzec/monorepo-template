import { zodResolver } from '@hookform/resolvers/zod';
import produce from 'immer';
import remove from 'lodash/remove';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';

import AutoComplete, { autoCompleteUtils } from '$/components/auto-complete';
import Button from '$/components/button';
import { zodUtils } from '$/utils/zod';

export default {
  title: 'Packages/Components/AutoComplete',
  component: AutoComplete,
};

interface SelectValue {
  display: string;
  value: number;
}

interface ReactHookedFormData {
  value: number;
}

interface MultiReactHookedFormData {
  values: number[];
}

const reactHookFormDataSchema = zodUtils.schemaForType<ReactHookedFormData>()(
  zod.object({
    value: zod.number().min(1, 'minimum value of 1'),
  }),
);

interface ExampleProps {
  selectedItemIndex?: number;
  showItemsOnFocus?: boolean;
  forceSelection?: boolean;
  placeholder?: string;
  useAsync?: boolean;
}

const getItemsAsync = async (inputValue: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    { display: `${inputValue} 1`, value: 11 },
    { display: `${inputValue} 2`, value: 22 },
    { display: `${inputValue} 3`, value: 33 },
    { display: `${inputValue} 4`, value: 44 },
  ];
};

const BasicExample = ({
  selectedItemIndex = -1,
  showItemsOnFocus = false,
  forceSelection = true,
  placeholder = '',
  useAsync = false,
}: ExampleProps) => {
  const [items] = useState<SelectValue[]>([
    { display: 'test1', value: 11 },
    { display: 'test2', value: 22 },
    { display: 'tes3', value: 33 },
    { display: 'tes4', value: 44 },
  ]);
  const [selectedItem, setSelectedItem] = useState<SelectValue | null>(
    selectedItemIndex >= 0 ? items[selectedItemIndex] : null,
  );

  const onResetSelected = useCallback(() => {
    setSelectedItem(null);
  }, [setSelectedItem]);

  return (
    <>
      <AutoComplete
        forceSelection={forceSelection}
        showItemsOnFocus={showItemsOnFocus}
        items={items}
        itemToString={(item) => item?.display ?? ''}
        filterItems={autoCompleteUtils.buildFilterItems()}
        renderItems={autoCompleteUtils.buildRenderItem()}
        onItemSelected={autoCompleteUtils.buildItemSelected(setSelectedItem)}
        selectedItem={selectedItem}
        placeholder={placeholder}
        getItemsAsync={useAsync ? getItemsAsync : undefined}
      />
      <Button data-id="reset-selected-button" onClick={onResetSelected}>
        reset selected
      </Button>
      {selectedItem && (
        <div data-id="check-selected-auto-complete-value">selected item value: {selectedItem.display}</div>
      )}
    </>
  );
};

const BasicHookedExample = ({
  selectedItemIndex = -1,
  showItemsOnFocus = false,
  forceSelection = true,
  placeholder = '',
  useAsync = false,
}: ExampleProps) => {
  const [items] = useState<SelectValue[]>([
    { display: 'test1', value: 11 },
    { display: 'test2', value: 22 },
    { display: 'tes3', value: 33 },
    { display: 'tes4', value: 44 },
  ]);
  const [selectedItem, setSelectedItem] = useState<SelectValue | null>(
    selectedItemIndex >= 0 ? items[selectedItemIndex] : null,
  );
  const { control, setValue, getValues } = useForm<ReactHookedFormData>({
    resolver: zodResolver(reactHookFormDataSchema),
    defaultValues: {
      value: selectedItem?.value || undefined,
    },
  });

  const formValues = getValues();

  return (
    <>
      <AutoComplete.Hooked
        forceSelection={forceSelection}
        showItemsOnFocus={showItemsOnFocus}
        name="value"
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        control={control}
        items={items}
        setValue={setValue}
        placeholder={placeholder}
        getItemsAsync={useAsync ? getItemsAsync : undefined}
      />
      {selectedItem && (
        <div data-id="check-selected-auto-complete-value">selected item value: {selectedItem.display}</div>
      )}
      {formValues.value && <div data-id="check-form-value">form value: {formValues.value}</div>}
    </>
  );
};

const MultiSelectExample = ({
  selectedItemIndex = -1,
  showItemsOnFocus = false,
  forceSelection = true,
  placeholder = '',
  useAsync = false,
}: ExampleProps) => {
  const [items] = useState<SelectValue[]>([
    { display: 'test1', value: 11 },
    { display: 'test2', value: 22 },
    { display: 'tes3', value: 33 },
    { display: 'tes4', value: 44 },
  ]);
  const [selectedItems, setSelectedItems] = useState<Array<SelectValue>>(
    selectedItemIndex < 0 ? [] : [items[selectedItemIndex]],
  );

  const onDeleteSelectedItem = useCallback(
    (value: number) => {
      setSelectedItems(
        produce(selectedItems, (draftState) => {
          remove(draftState, { value });
        }),
      );
    },
    [selectedItems, setSelectedItems],
  );

  return (
    <>
      <AutoComplete
        forceSelection={forceSelection}
        showItemsOnFocus={showItemsOnFocus}
        items={items}
        itemToString={(item) => item?.display ?? ''}
        filterItems={autoCompleteUtils.buildFilterItems(selectedItems)}
        renderItems={autoCompleteUtils.buildRenderItem()}
        onItemSelected={autoCompleteUtils.buildItemSelectedMulti(selectedItems, setSelectedItems)}
        selectedItems={selectedItems}
        onDelete={onDeleteSelectedItem}
        placeholder={placeholder}
        getItemsAsync={useAsync ? getItemsAsync : undefined}
      />
    </>
  );
};

const MultiSelectHookedExample = ({
  selectedItemIndex = -1,
  showItemsOnFocus = false,
  forceSelection = true,
  placeholder = '',
  useAsync = false,
}: ExampleProps) => {
  const [items] = useState<SelectValue[]>([
    { display: 'test1', value: 11 },
    { display: 'test2', value: 22 },
    { display: 'tes3', value: 33 },
    { display: 'tes4', value: 44 },
  ]);
  const [selectedItems, setSelectedItems] = useState<Array<SelectValue>>(
    selectedItemIndex < 0 ? [] : [items[selectedItemIndex]],
  );

  const { control, getValues, setValue } = useForm<MultiReactHookedFormData>({
    resolver: zodResolver(reactHookFormDataSchema),
    defaultValues: {
      values: [],
    },
  });

  const onDeleteSelectedItem = useCallback(
    (value: number) => {
      setSelectedItems(
        produce(selectedItems, (draftState) => {
          remove(draftState, { value });
        }),
      );
    },
    [selectedItems, setSelectedItems],
  );

  const formValues = getValues();

  return (
    <>
      <AutoComplete.Hooked
        forceSelection={forceSelection}
        showItemsOnFocus={showItemsOnFocus}
        name="values"
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        control={control}
        items={items}
        setValue={setValue}
        onDelete={onDeleteSelectedItem}
        placeholder={placeholder}
        getItemsAsync={useAsync ? getItemsAsync : undefined}
      />
      {formValues.values && <div data-id="check-form-value">form value: {formValues.values.join(',')}</div>}
    </>
  );
};

export const Single = () => {
  return <BasicExample />;
};

export const Multi = () => {
  return <MultiSelectExample />;
};

export const SingleHooked = () => {
  return <BasicHookedExample />;
};

export const MultiHooked = () => {
  return <MultiSelectHookedExample />;
};

export const SinglePreselected = () => {
  return <BasicExample selectedItemIndex={0} />;
};

export const MultiPreselected = () => {
  return <MultiSelectExample selectedItemIndex={0} />;
};

export const SingleHookedPreselected = () => {
  return <BasicHookedExample selectedItemIndex={0} />;
};

export const MultiHookedPreselected = () => {
  return <MultiSelectHookedExample selectedItemIndex={0} />;
};

export const SingleShowItemsOnFocus = () => {
  return <BasicExample showItemsOnFocus />;
};

export const MultiShowItemsOnFocus = () => {
  return <MultiSelectExample showItemsOnFocus />;
};

export const SingleHookedShowItemsOnFocus = () => {
  return <BasicHookedExample showItemsOnFocus />;
};

export const MultiHookedShowItemsOnFocus = () => {
  return <MultiSelectHookedExample showItemsOnFocus />;
};

export const SingleNoForceSelection = () => {
  return <BasicExample forceSelection={false} />;
};

export const MultiNoForceSelection = () => {
  return <MultiSelectExample forceSelection={false} />;
};

export const SingleHookedNoForceSelection = () => {
  return <BasicHookedExample forceSelection={false} />;
};

export const MultiHookedNoForceSelection = () => {
  return <MultiSelectHookedExample forceSelection={false} />;
};

export const SinglePlaceholder = () => {
  return <BasicExample placeholder="placeholder" />;
};

export const MultiPlaceholder = () => {
  return <MultiSelectExample placeholder="placeholder" />;
};

export const SingleHookedPlaceholder = () => {
  return <BasicHookedExample placeholder="placeholder" />;
};

export const MultiHookedPlaceholder = () => {
  return <MultiSelectHookedExample placeholder="placeholder" />;
};

export const SingleAsync = () => {
  return <BasicExample useAsync />;
};

export const MultiAsync = () => {
  return <MultiSelectExample useAsync />;
};

export const SingleHookedAsync = () => {
  return <BasicHookedExample useAsync />;
};

export const MultiHookedAsync = () => {
  return <MultiSelectHookedExample useAsync />;
};

// export const SingleSelect: Story = () => {
//   const [items] = useState<SelectValue[]>(buildItems(100));
//   const [selectedItem, setSelectedItem] = useState<SelectValue | null>(null);
//
//   const onResetSelected = useCallback(() => {
//     setSelectedItem(null);
//   }, [setSelectedItem]);
//
//   return (
//     <>
//       <AutoComplete
//         showItemsOnFocus
//         forceSelection
//         items={items}
//         itemToString={(item) => item?.display ?? ''}
//         filterItems={autoCompleteUtils.buildFilterItems()}
//         renderItems={autoCompleteUtils.buildRenderItem()}
//         onItemSelected={autoCompleteUtils.buildItemSelected(setSelectedItem)}
//         selectedItem={selectedItem}
//         placeholder="Select a value..."
//       />
//       <Button data-id="reset-selected-button" onClick={onResetSelected}>
//         reset selected
//       </Button>
//       {selectedItem && (
//         <div data-id="check-selected-auto-complete-value">selected item value: {selectedItem.value}</div>
//       )}
//     </>
//   );
// };
//
// export const MultiSelect = () => {
//   const [items] = useState<SelectValue[]>([
//     { display: 'test1', value: 11 },
//     { display: 'test2', value: 22 },
//     { display: 'tes3', value: 33 },
//     { display: 'tes4', value: 44 },
//   ]);
//   const [selectedItems, setSelectedItems] = useState<Array<SelectValue>>([]);
//
//   const onDeleteSelectedItem = useCallback(
//     (value: number) => {
//       setSelectedItems(
//         produce(selectedItems, (draftState) => {
//           remove(draftState, { value });
//         }),
//       );
//     },
//     [selectedItems, setSelectedItems],
//   );
//
//   return (
//     <>
//       <AutoComplete
//         showItemsOnFocus
//         items={items}
//         itemToString={(item) => item?.display ?? ''}
//         filterItems={autoCompleteUtils.buildFilterItems(selectedItems)}
//         renderItems={autoCompleteUtils.buildRenderItem()}
//         onItemSelected={autoCompleteUtils.buildItemSelectedMulti(selectedItems, setSelectedItems)}
//         selectedItems={selectedItems}
//         onDelete={onDeleteSelectedItem}
//       />
//     </>
//   );
// };
