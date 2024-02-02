import { FC, useState, useEffect } from 'react';

import { TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { UserRole } from 'api/types';
import { delay } from 'components/layout/signIn/config';
import {
  minWordLength,
  placeholderTextInput,
  sizeButton,
  sizeTextInput,
} from 'components/shared/formSignIn/config';
import { InputValidation, TypeButton } from 'components/shared/formSignIn/types';
import useDebounced from 'hooks/debounced/useDebounced';
import { useAppDispatch, RootState } from 'store/store';
import { userThunk } from 'store/user/userData.api';

const FormSignIn: FC = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const isNameAvailable = useSelector((state: RootState) => state.user.isNameAvailable);
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  const form = useForm({
    initialValues: { name: '' },
    validateInputOnChange: true,
    validate: {
      name: (value: string) => {
        if (value.length < minWordLength) {
          return InputValidation.Length;
        }

        setNickname(value);

        return null;
      },
    },
  });

  const checkEnterName = async (): Promise<void> => {
    if (nickname !== '') {
      dispatch(userThunk.checkFieldName(nickname));
    }
  };

  useDebounced({
    callback: () => checkEnterName(),
    delay,
    dependencies: [nickname],
  });

  useEffect(() => {
    if (isNameAvailable) return;

    form.setFieldError('name', InputValidation.Invalid);
  }, [isNameAvailable]);

  const setUser = async (): Promise<void> => {
    const data = {
      name: nickname,
      displayName: user?.displayName,
      email: user?.email,
      createdAt: user?.metadata.creationTime,
      role: UserRole.User,
      balance: 0,
    };

    dispatch(userThunk.setDoc(data));
  };

  const submitForm = async (): Promise<void> => {
    const { errors } = form;

    if (errors.name) return;

    await setUser().then(() => navigate('/'));
  };

  return (
    <form onSubmit={form.onSubmit(() => submitForm())}>
      <TextInput
        mt={sizeTextInput}
        placeholder={placeholderTextInput}
        {...form.getInputProps('name')}
      />
      <Button type={TypeButton.Submit} mt={sizeButton}>
        Submit
      </Button>
    </form>
  );
};

export default FormSignIn;
