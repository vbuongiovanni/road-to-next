import { z } from 'zod';

type TFieldErrors = Record<string, string[] | undefined>;

export enum ActionStateStatus {
  Success = 'success',
  Error = 'error',
}

export type TActionState = {
  status?: ActionStateStatus;
  message: string;
  payload?: FormData;
  fieldErrors: TFieldErrors;
  timestamp?: number;
};

export const createEmptyActionState = (): TActionState => ({
  message: '',
  fieldErrors: {},
  timestamp: Date.now(),
});

export const toActionState = (
  status: ActionStateStatus,
  message: string,
  formData?: FormData,
): TActionState => {
  return {
    ...createEmptyActionState(),
    status,
    payload: formData,
    message,
  };
};

export const fromErrorToActionState = (
  error: unknown,
  formData?: FormData,
): TActionState => {
  let fieldErrors: TFieldErrors = {};
  if (error instanceof z.ZodError) {
    fieldErrors = error.issues.reduce((acc, issue) => {
      const fieldName = issue.path[0] as string;
      if (!acc[fieldName]) {
        acc[fieldName] = [issue.message];
      } else {
        acc[fieldName].push(issue.message);
      }
      return acc;
    }, {} as TFieldErrors);
    return {
      ...toActionState(ActionStateStatus.Error, ''),
      fieldErrors,
      payload: formData,
    };
  } else if (error instanceof Error) {
    return {
      ...toActionState(ActionStateStatus.Error, error.message),
      fieldErrors,
      payload: formData,
    };
  }

  return {
    ...toActionState(ActionStateStatus.Error, 'An unknown error occurred.'),
    fieldErrors,
    payload: formData,
  };
};
