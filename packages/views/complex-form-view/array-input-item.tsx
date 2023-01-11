import React, { memo } from 'react';
import { Path, UseFormRegister } from 'react-hook-form';

import DragDrop from '$/components/drag-drop';
import Input from '$/components/input';
import { ComplexFormData } from '$/views/complex-form-view/complex-form-view';
import styles from '$/views/complex-form-view/complex-form-view.module.css';

interface ItemDisplayProps {
  id: string;
  name: Path<ComplexFormData>;
  register: UseFormRegister<ComplexFormData>;
  index: number;
}

const ItemDisplay = memo(({ id, name, index, register }: ItemDisplayProps) => {
  const isArrayField = name === 'todos' || name === 'todosCompleted';

  // not sure how better to avoid typescript error with explicit cast
  const property = (isArrayField ? `${name}.${index}.name` : name) as Path<ComplexFormData>;

  return (
    <DragDrop.SortableItem sortId={id}>
      <div className={styles.todoItem}>
        <Input.Hooked key={id} type="text" property={property} register={register} />
      </div>
    </DragDrop.SortableItem>
  );
});

export default ItemDisplay;
