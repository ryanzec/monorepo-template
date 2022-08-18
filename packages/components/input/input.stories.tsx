import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';

import Input from '$/components/input';
import Label from '$/components/label';
import { storybookUtils } from '$/utils/storybook';
import { zodUtils } from '$/utils/zod';

export default {
  title: 'Packages/Components/Input',
  component: Input,
  decorators: [storybookUtils.AuthenticatedWrapperDecorator],
};

export const Plain = () => {
  return (
    <Input.Container>
      <Label>
        Email
        <Input type="text" />
      </Label>
    </Input.Container>
  );
};

export const Hooked = () => {
  interface FormDataSchema {
    email: string;
  }

  const [hookedValue, setHookedValue] = useState('');
  const formDataSchema = zodUtils.schemaForType<FormDataSchema>()(
    zod.object({
      email: zod.string(),
    }),
  );

  const { register, watch } = useForm<FormDataSchema>({
    resolver: zodResolver(formDataSchema),
  });

  useEffect(() => {
    const subscription = watch((values, { name }) => {
      if (!name) {
        return;
      }

      setHookedValue(() => values[name] || '');
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  return (
    <>
      <Input.Container>
        <Label>
          Email
          <Input.Hooked type="text" property="email" register={register} />
          <div data-id="hooked-value">{hookedValue}</div>
        </Label>
      </Input.Container>
    </>
  );
};
