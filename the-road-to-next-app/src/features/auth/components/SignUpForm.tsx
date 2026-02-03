'use client';
import { useActionState } from 'react';
import { Form } from '@/components/custom/form/Form';
import { FormItem } from '@/components/custom/form/FormItem';
import { createEmptyActionState } from '@/components/custom/form/utils';
import { signUpAction } from '../actions/signUpAction';

export const SignUpForm = () => {
  const [actionState, formAction] = useActionState(
    signUpAction,
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
        label={'Email'}
        actionState={actionState}
        fieldName={'email'}
        inputType='email'
      />
      <FormItem
        label={'Password'}
        actionState={actionState}
        fieldName={'password'}
        inputType='password'
      />
      <FormItem
        label={'Confirm Password'}
        actionState={actionState}
        fieldName={'confirmPassword'}
        inputType='password'
      />
    </Form>
  );
};
