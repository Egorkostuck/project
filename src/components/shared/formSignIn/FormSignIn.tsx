import { ChangeEvent, FormEvent, FC, useState } from 'react';

import { TextInput, Button } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { checkUserNicknameInDB, setUserInDB } from 'api/api';
import { delay } from 'components/layout/signIn/config';
import { minWordLength } from 'components/shared/formSignIn/config';
import { InputValidation } from 'components/shared/formSignIn/types';
import useDebounced from 'hooks/debounced/useDebounced';
import { setUserIsLoggedIn } from 'store/user/userData.api';

const FormSignIn: FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const [nickname, setNickname] = useState('');
  const [isNameAvailable, setIsNameAvailable] = useState(true);
  const [error, setError] = useState<Nullable<string>>(null);
  const navigate = useNavigate();

  const validate = (): void => {
    let errorText = null;

    if (nickname === '') return;

    if (nickname.length < minWordLength) {
      errorText = InputValidation.Length;
    }

    if (nickname.length > minWordLength && !isNameAvailable) {
      errorText = InputValidation.Invalid;
    }

    setError(errorText);
  };

  const checkEnterName = async (): Promise<void> => {
    if (nickname !== '') {
      const resultQuery = await checkUserNicknameInDB(nickname);

      setError(null);
      setIsNameAvailable(true);

      setIsNameAvailable(resultQuery);
    }

    validate();
  };

  useDebounced({
    callback: () => checkEnterName(),
    delay,
    dependencies: [nickname, isNameAvailable],
  });

  const enterNickname = (e: ChangeEvent<HTMLInputElement>): void => {
    setNickname(e.target.value);
  };

  const setUser = async (): Promise<void> => {
    const result: boolean = await setUserInDB({ user, nickname });

    dispatch(setUserIsLoggedIn(result));
  };
  const submitForm = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (error) return;

    await setUser().then(() => navigate('/'));
  };

  return (
    <form onSubmit={submitForm}>
      <TextInput
        onChange={enterNickname}
        mt="md"
        placeholder="Enter your nickname"
        error={error}
      />
      <Button type="submit" mt="sm">
        Submit
      </Button>
    </form>
  );
};

export default FormSignIn;
