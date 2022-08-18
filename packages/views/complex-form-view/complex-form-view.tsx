import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import * as zod from 'zod';

import AutoComplete from '$/components/auto-complete';
import Button from '$/components/button';
import Input from '$/components/input';
import Label from '$/components/label';
import ValidationMessage from '$/components/validation-message';
import { zodUtils } from '$/utils/zod';
import TodoItems from '$/views/complex-form-view/todo-items';
import { FieldId, Todo } from '$/views/complex-form-view/utils';

export interface AutoCompleteValue {
  display: string;
  value: number;
}

export interface ComplexFormData {
  firstName: string;
  autoComplete: number;
  email: string;
  mobileNumber: string;
  title: string;
  developer: string;
  dateTime: string;
  todos: Todo[];
  todosCompleted: Todo[];
}

const complexFormDataSchema = zodUtils.schemaForType<ComplexFormData>()(
  zod.object({
    firstName: zod.string().min(1, 'custom error message'),
    autoComplete: zod.number(),
    email: zod.string(),
    mobileNumber: zod.string(),
    title: zod.string(),
    developer: zod.string(),
    dateTime: zod.string(),
    todos: zod
      .object({
        id: zod.string().min(1),
        name: zod.string().min(1),
        isCompleted: zod.boolean(),
      })
      .array(),
    todosCompleted: zod
      .object({
        id: zod.string().min(1),
        name: zod.string().min(1),
        isCompleted: zod.boolean(),
      })
      .array(),
  }),
);

const onSubmitForm = (data: ComplexFormData) => {
  console.log(data);
};

const todos: Todo[] = [];

for (let i = 0; i < 2; i++) {
  todos.push({ id: uuid(), name: `static values ${i}`, isCompleted: false });
}

const ComplexFormView = () => {
  const [autoCompleteValues] = useState<AutoCompleteValue[]>([
    { display: 'test1', value: 11 },
    { display: 'test2', value: 22 },
    { display: 'tes3', value: 33 },
    { display: 'tes4', value: 44 },
  ]);
  const [selectedAutoCompleteValue, setSelectedAutoCompleteValue] = useState<AutoCompleteValue | null>();
  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ComplexFormData>({
    resolver: zodResolver(complexFormDataSchema),
    defaultValues: {
      todos,
    },
  });
  const {
    fields: todoValues,
    append: appendTodoValues,
    swap: swapTodoValues,
    remove: removeTodoValues,
    insert: insertTodoValues,
  } = useFieldArray({
    control,
    name: 'todos',

    // need an explicit key name since the drag and drop functionality also uses the `id` property but when moving
    // the inputs around, the react-hook-form library seem to change that id which breaks the drag and drop
    // functionality so this has the form library to modifier a property that won't interfere with the drag and
    // drop functionality
    keyName: 'formId',
  });
  const {
    fields: todoCompletedValues,
    swap: swapTodoCompletedValues,
    remove: removeTodoCompletedValues,
    insert: insertTodoCompletedValues,
  } = useFieldArray({
    control,
    name: 'todosCompleted',

    // need an explicit key name since the drag and drop functionality also uses the `id` property but when moving
    // the inputs around, the react-hook-form library seem to change that id which breaks the drag and drop
    // functionality so this has the form library to modifier a property that won't interfere with the drag and
    // drop functionality
    keyName: 'formId',
  });

  const moveItem = useCallback(
    (draggingIndex: number, draggingFieldId: string, checkingIndex: number, checkingFieldId: string) => {
      // there seems to be something with how the react hook form array field management works that can cause the
      // drag and drop functionality to result in -1 index checks so in those cases, we just ignore because otherwise
      // we might get empty items added to the array field
      if (draggingIndex === -1 || checkingIndex === -1) {
        return;
      }

      const sourceTodos = getValues(draggingFieldId === FieldId.TODOS ? 'todos' : 'todosCompleted');

      // we are moving withing the same list
      if (draggingFieldId === checkingFieldId && sourceTodos.length >= 2) {
        // there seems to be something with how the react hook form array field management works that can cause the
        // drag and drop functionality to result in large than valid index checks so in those cases, we just ignore
        // because otherwise we might get empty items added to the array field
        if (draggingIndex >= sourceTodos.length || checkingIndex >= sourceTodos.length) {
          return;
        }

        const swapFunction = draggingFieldId === FieldId.TODOS ? swapTodoValues : swapTodoCompletedValues;

        swapFunction(draggingIndex, checkingIndex);

        return;
      }

      // based on where we are dragging from determines certain functionality and data sources
      const removeFunction = draggingFieldId === FieldId.TODOS ? removeTodoValues : removeTodoCompletedValues;
      const insertFunction = checkingFieldId === FieldId.TODOS ? insertTodoValues : insertTodoCompletedValues;

      // we need to first get the data the is being moved between fields before doing any modifications
      const copyValue = sourceTodos[draggingIndex];

      removeFunction(draggingIndex);
      insertFunction(checkingIndex, copyValue);
    },
    [
      getValues,
      swapTodoValues,
      swapTodoCompletedValues,
      removeTodoValues,
      removeTodoCompletedValues,
      insertTodoCompletedValues,
      insertTodoValues,
    ],
  );

  return (
    <div data-id="complex-form-view">
      <Input.Container>
        <Label>First Name</Label>
        <Input.Hooked type="text" placeholder="First name" property="firstName" register={register} />
        {errors.firstName?.message && <ValidationMessage>{errors.firstName.message}</ValidationMessage>}
      </Input.Container>
      <Input.Container>
        <Controller
          control={control}
          name="autoComplete"
          render={({ field }) => {
            return (
              <AutoComplete
                items={autoCompleteValues}
                itemToString={(item) => item?.display ?? ''}
                filterItems={({ items, inputValue }) => {
                  return items.filter((item) => item?.display.toLowerCase().includes(inputValue?.toLowerCase() ?? ''));
                }}
                renderItems={({ items, highlightedIndex, propGetters: { getItemProps } }) => {
                  return items.map((item, index) => (
                    <li
                      data-id={`item${highlightedIndex === index ? ' highlighted-item' : ''}`}
                      style={highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}}
                      key={`${item?.display}${index}`}
                      {...getItemProps({ item, index })}
                    >
                      {item?.display}
                    </li>
                  ));
                }}
                onItemSelected={(selectedItem) => {
                  field.onChange(selectedItem?.value || undefined);
                  setSelectedAutoCompleteValue(selectedItem);
                }}
                selectedItem={selectedAutoCompleteValue}
              />
            );
          }}
        />
        {errors.autoComplete?.message && <ValidationMessage>{errors.autoComplete.message}</ValidationMessage>}
      </Input.Container>
      <Input.Container>
        <Label>Email</Label>
        <Input.Hooked type="text" placeholder="Email" property="email" register={register} />
        {errors.email?.message && <ValidationMessage>{errors.email.message}</ValidationMessage>}
      </Input.Container>
      <Input.Container>
        <Label>Mobile Number</Label>
        <Input.Hooked type="tel" placeholder="Mobile number" property="mobileNumber" register={register} />
        {errors.mobileNumber?.message && <ValidationMessage>{errors.mobileNumber.message}</ValidationMessage>}
      </Input.Container>
      <Input.Container>
        <Label>Title</Label>
        <select {...register('title', { required: true })}>
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Miss">Miss</option>
          <option value="Dr">Dr</option>
        </select>
        {errors.title?.message && <ValidationMessage>{errors.title.message}</ValidationMessage>}
      </Input.Container>
      <Input.Container>
        <Label>Developer</Label>
        <Input.Hooked property="developer" register={register} type="radio" value="Yes" /> Yes
        <Input.Hooked property="developer" register={register} type="radio" value="No" /> No
        {errors.developer?.message && <ValidationMessage>{errors.developer.message}</ValidationMessage>}
      </Input.Container>
      <Input.Container>
        <Label>DateTime</Label>
        <Input.Hooked type="datetime" placeholder="Date Time" property="dateTime" register={register} />
        {errors.dateTime?.message && <ValidationMessage>{errors.dateTime.message}</ValidationMessage>}
      </Input.Container>
      <TodoItems
        todoItems={todoValues}
        completedTodoItems={todoCompletedValues}
        moveItem={moveItem}
        register={register}
        errors={errors}
      />
      <Button
        onClick={() => {
          appendTodoValues({ id: uuid(), name: `static values ${todoValues.length}`, isCompleted: false });
        }}
      >
        Add Todo
      </Button>
      <Button onClick={handleSubmit(onSubmitForm)}>Submit</Button>
    </div>
  );
};

export default ComplexFormView;
