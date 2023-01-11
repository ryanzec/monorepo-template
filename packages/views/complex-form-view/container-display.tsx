import React from 'react';
import { Path, UseFormRegister } from 'react-hook-form';

import DragDrop from '$/components/drag-drop';
import ItemDisplay from '$/views/complex-form-view/array-input-item';
import { ComplexFormData } from '$/views/complex-form-view/complex-form-view';
import styles from '$/views/complex-form-view/complex-form-view.module.css';
import { FormTodo } from '$/views/complex-form-view/utils';

interface ContainerDisplayProps {
  dropId: Path<ComplexFormData>;
  items: FormTodo[];
  register: UseFormRegister<ComplexFormData>;
}

const ContainerDisplay = ({ dropId, items, register }: ContainerDisplayProps) => {
  return (
    <DragDrop.DroppableContainer dropId={dropId} items={items} className={styles.todoList}>
      {items.map((todoItem, index) => (
        <ItemDisplay key={todoItem.formId} id={todoItem.id} name={dropId} register={register} index={index} />
      ))}
    </DragDrop.DroppableContainer>
  );
};

export default ContainerDisplay;
