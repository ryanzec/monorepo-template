import React, { useCallback, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { v4 as uuid } from 'uuid';
import { zodUtils } from '$/utils/zod';
import { FieldId, Todo } from '$/views/complex-form-page/common';
import Form from '$/components/form/form';
import { DragDropItem } from '$/views/complex-form-page/drag-drop-item';
import { Button } from '$/components/button/button';
import { EmptyDropContainer } from '$/views/complex-form-page/empty-drop-container';
import { TodoLists } from '$/views/complex-form-page/complex-form-page.css';

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

const ComplexFormPage = () => {
  const [autoCompleteValues] = useState<AutoCompleteValue[]>([
    { display: 'test1', value: 11 },
    { display: 'test2', value: 22 },
    { display: 'tes3', value: 33 },
    { display: 'tes4', value: 44 },
  ]);
  const [selectedAutoCompleteValue, setSelectedAutoCompleteValue] = useState<AutoCompleteValue | null | undefined>();
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
  });
  const {
    fields: todoCompletedValues,
    swap: swapTodoCompletedValues,
    remove: removeTodoCompletedValues,
    insert: insertTodoCompletedValues,
  } = useFieldArray({
    control,
    name: 'todosCompleted',
  });

  const moveItem = useCallback(
    (draggingIndex: number, draggingFieldId: string, checkingIndex: number, checkingFieldId: string) => {
      const sourceTodos = getValues(draggingFieldId === FieldId.TODOS ? 'todos' : 'todosCompleted');

      // we are moving withing the same list
      if (draggingFieldId === checkingFieldId && sourceTodos.length >= 2) {
        const swapFunction = draggingFieldId === FieldId.TODOS ? swapTodoValues : swapTodoCompletedValues;

        swapFunction(draggingIndex, checkingIndex);

        return;
      }
      // based on where we are dragging from determines certain functionality and data sources
      const removeFunction = draggingFieldId === FieldId.TODOS ? removeTodoValues : removeTodoCompletedValues;
      const insertFunction = draggingFieldId === FieldId.TODOS ? insertTodoCompletedValues : insertTodoValues;

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
    <div data-id="complex-form-page">
      <Form.InputContainer>
        <Form.Label>First Name</Form.Label>
        <Form.Input type="text" placeholder="First name" property="firstName" register={register} />
        {errors.firstName?.message && <Form.ValidationMessage>{errors.firstName.message}</Form.ValidationMessage>}
      </Form.InputContainer>
      <Form.InputContainer>
        <Controller
          control={control}
          name="autoComplete"
          render={({ field }) => {
            return (
              <Form.AutoComplete
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
        {errors.autoComplete?.message && <Form.ValidationMessage>{errors.autoComplete.message}</Form.ValidationMessage>}
      </Form.InputContainer>
      <Form.InputContainer>
        <Form.Label>Email</Form.Label>
        <Form.Input type="text" placeholder="Email" property="email" register={register} />
        {errors.email?.message && <Form.ValidationMessage>{errors.email.message}</Form.ValidationMessage>}
      </Form.InputContainer>
      <Form.InputContainer>
        <Form.Label>Mobile Number</Form.Label>
        <Form.Input type="tel" placeholder="Mobile number" property="mobileNumber" register={register} />
        {errors.mobileNumber?.message && <Form.ValidationMessage>{errors.mobileNumber.message}</Form.ValidationMessage>}
      </Form.InputContainer>
      <Form.InputContainer>
        <Form.Label>Title</Form.Label>
        <select {...register('title', { required: true })}>
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Miss">Miss</option>
          <option value="Dr">Dr</option>
        </select>
        {errors.title?.message && <Form.ValidationMessage>{errors.title.message}</Form.ValidationMessage>}
      </Form.InputContainer>
      <Form.InputContainer>
        <Form.Label>Developer</Form.Label>
        <Form.Input property="developer" register={register} type="radio" value="Yes" /> Yes
        <Form.Input property="developer" register={register} type="radio" value="No" /> No
        {errors.developer?.message && <Form.ValidationMessage>{errors.developer.message}</Form.ValidationMessage>}
      </Form.InputContainer>
      <Form.InputContainer>
        <Form.Label>DateTime</Form.Label>
        <Form.Input type="datetime" placeholder="Date Time" property="dateTime" register={register} />
        {errors.dateTime?.message && <Form.ValidationMessage>{errors.dateTime.message}</Form.ValidationMessage>}
      </Form.InputContainer>
      <div className={TodoLists}>
        <div data-id="todos">
          <Form.Label>Todos</Form.Label>
          {todoValues.length === 0 && <EmptyDropContainer moveItem={moveItem} fieldId={FieldId.TODOS} />}
          {todoValues.map((item, index) => (
            <DragDropItem
              fieldId={FieldId.TODOS}
              key={item.id}
              item={item}
              index={index}
              register={register}
              errors={errors}
              moveItem={moveItem}
            />
          ))}
        </div>
        <Button
          onClick={() => {
            appendTodoValues({ id: uuid(), name: `static values ${todoValues.length}`, isCompleted: false });
          }}
        >
          Add Todo
        </Button>
        <div data-id="todos-completed">
          <Form.Label>Todos Completed</Form.Label>
          {todoCompletedValues.length === 0 && (
            <EmptyDropContainer moveItem={moveItem} fieldId={FieldId.TODOS_COMPLETED} />
          )}
          {todoCompletedValues.length > 0 &&
            todoCompletedValues.map((item, index) => (
              <DragDropItem
                fieldId={FieldId.TODOS_COMPLETED}
                key={item.id}
                item={item}
                index={index}
                register={register}
                errors={errors}
                moveItem={moveItem}
              />
            ))}
        </div>
      </div>

      <Button onClick={handleSubmit(onSubmitForm)}>Submit</Button>
    </div>
  );
};

export default ComplexFormPage;
