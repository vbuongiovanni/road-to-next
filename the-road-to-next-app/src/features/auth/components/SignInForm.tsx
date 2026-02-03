'use client';
import { useActionState } from 'react';
import { Form } from '@/components/custom/form/Form';
import { FormItem } from '@/components/custom/form/FormItem';
import { createEmptyActionState } from '@/components/custom/form/utils';
import { signInAction } from '../actions/signInAction';

export const SignInForm = () => {
  const [actionState, formAction] = useActionState(
    signInAction,
    createEmptyActionState(),
  );

  return (
    <Form action={formAction} actionState={actionState}>
      <FormItem
        label={'Username'}
        actionState={actionState}
        fieldName={'username'}
      />
      <FormItem
        label={'Password'}
        actionState={actionState}
        fieldName={'password'}
        inputType='password'
      />
    </Form>
  );
};
