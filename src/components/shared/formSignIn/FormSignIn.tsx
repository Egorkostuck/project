import { FC, useEffect } from 'react';

import { TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { UserRole } from 'api/types';
import { delay } from 'components/layout/signIn/config';
import { minWordLength } from 'components/shared/formSignIn/config';
import { InputValidation } from 'components/shared/formSignIn/types';
import useDebounced from 'hooks/debounced/useDebounced';
import { Path } from 'routers/types';
import { useAppDispatch, RootState } from 'store/store';
import { userThunk } from 'store/user/userData.api';

const FormSignIn: FC = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const isNameAvailable = useSelector((state: RootState) => state.user.isNameAvailable);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: { name: '' },
    validateInputOnChange: true,
    validate: {
      name: (value: string) => {
        if (value.length < minWordLength) {
          return InputValidation.Length;
        }

        return null;
      },
    },
  });

  const { name } = form.values;

  const checkEnterName = (): void => {
    if (name === '') {
      return;
    }

    dispatch(userThunk.checkFieldName(name));
  };

  useDebounced({
    callback: checkEnterName,
    delay,
    dependencies: [name],
  });

  useEffect(() => {
    if (isNameAvailable) return;

    form.setFieldError('name', InputValidation.Invalid);
  }, [isNameAvailable]);

  const setUser = (): void => {
    const data = {
      name,
      displayName: user?.displayName,
      email: user?.email,
      createdAt: user?.metadata.creationTime,
      role: UserRole.User,
      balance: 0,
    };

    dispatch(userThunk.setDoc(data)).then(() => navigate(Path.Home));
  };

  const submitForm = (): void => {
    const { errors } = form;

    if (errors.name) return;

    setUser();
  };

  return (
    <form onSubmit={form.onSubmit(submitForm)}>
      <TextInput
        mt="md"
        placeholder="Enter your nickname"
        {...form.getInputProps('name')}
      />
      <Button type="submit" mt="sm">
        Submit
      </Button>
    </form>
  );
};

export default FormSignIn;
