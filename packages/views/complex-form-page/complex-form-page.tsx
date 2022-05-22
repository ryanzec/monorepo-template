import React, { useCallback } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { v4 as uuid } from 'uuid';
import * as zodUtils from '$utils/zod';
import { FieldId, Todo } from '$views/complex-form-page/types';
import { Label } from '$components/forms/label';
import { Input } from '$components/forms/input';
import { InputContainer } from '$components/forms/input-container';
import { ValidationMessage } from '$components/forms/validation-message';
import { DragDropItem } from '$views/complex-form-page/drag-drop-item';
import { Button } from '$components/button/button';
import { EmptyDropContainer } from '$views/complex-form-page/empty-drop-container';
import styled from '@emotion/styled';

export interface ComplexFormData {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  title: string;
  developer: string;
  dateTime: string;
  todos: Todo[];
  todosCompleted: Todo[];
}

export const complexFormDataSchema = zodUtils.schemaForType<ComplexFormData>()(
  zod.object({
    firstName: zod.string().min(1, 'Required fields'),
    lastName: zod.string(),
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

export const TodoLists = styled.div`
  display: flex;
`;

export const onSubmitForm = (data: ComplexFormData) => {
  console.log(data);
};

const todos: Todo[] = [];

for (let i = 0; i < 2; i++) {
  todos.push({ id: uuid(), name: uuid(), isCompleted: false });
}

export const ComplexFormPage = () => {
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
    append: appendTodoCompletedValues,
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
      const appendFunction = draggingFieldId === FieldId.TODOS ? appendTodoCompletedValues : appendTodoValues;
      const insertFunction = draggingFieldId === FieldId.TODOS ? insertTodoCompletedValues : insertTodoValues;
      const destinationTodos = getValues(draggingFieldId === FieldId.TODOS ? 'todosCompleted' : 'todos');

      // we need to first get the data the is being moved between fields before doing any modifications
      const copyValue = sourceTodos[draggingIndex];

      removeFunction(draggingIndex);

      if (destinationTodos.length <= 1) {
        appendFunction(copyValue);

        return;
      }

      insertFunction(checkingIndex, copyValue);
    },
    [
      getValues,
      swapTodoValues,
      swapTodoCompletedValues,
      appendTodoValues,
      appendTodoCompletedValues,
      removeTodoValues,
      removeTodoCompletedValues,
      insertTodoCompletedValues,
      insertTodoValues,
    ],
  );

  return (
    <div data-id="complex-form-page">
      <InputContainer>
        <Label>First Name</Label>
        <Input type="text" placeholder="First name" property="firstName" register={register} />
        {errors.firstName?.message && <ValidationMessage>{errors.firstName.message}</ValidationMessage>}
      </InputContainer>
      <InputContainer>
        <Label>Last Name</Label>
        <Input type="text" placeholder="Last name" property="lastName" register={register} />
        {errors.lastName?.message && <ValidationMessage>{errors.lastName.message}</ValidationMessage>}
      </InputContainer>
      <InputContainer>
        <Label>Email</Label>
        <Input type="text" placeholder="Email" property="email" register={register} />
        {errors.email?.message && <ValidationMessage>{errors.email.message}</ValidationMessage>}
      </InputContainer>
      <InputContainer>
        <Label>Mobile Number</Label>
        <Input type="tel" placeholder="Mobile number" property="mobileNumber" register={register} />
        {errors.mobileNumber?.message && <ValidationMessage>{errors.mobileNumber.message}</ValidationMessage>}
      </InputContainer>
      <InputContainer>
        <Label>Title</Label>
        <select {...register('title', { required: true })}>
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Miss">Miss</option>
          <option value="Dr">Dr</option>
        </select>
        {errors.title?.message && <ValidationMessage>{errors.title.message}</ValidationMessage>}
      </InputContainer>
      <InputContainer>
        <Label>Developer</Label>
        <Input property="developer" register={register} type="radio" value="Yes" /> Yes
        <Input property="developer" register={register} type="radio" value="No" /> No
        {errors.developer?.message && <ValidationMessage>{errors.developer.message}</ValidationMessage>}
      </InputContainer>
      <InputContainer>
        <Label>DateTime</Label>
        <Input type="datetime" placeholder="Date Time" property="dateTime" register={register} />
        {errors.dateTime?.message && <ValidationMessage>{errors.dateTime.message}</ValidationMessage>}
      </InputContainer>
      <TodoLists>
        <div data-id="todos">
          <Label>Todos</Label>
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
            appendTodoValues({ id: uuid(), name: uuid(), isCompleted: false });
          }}
        >
          Add Todo
        </Button>
        <div data-id="todos-completed">
          <Label>Todos Completed</Label>
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
      </TodoLists>

      <Button onClick={handleSubmit(onSubmitForm)}>Submit</Button>
    </div>
  );
};

export default ComplexFormPage;
