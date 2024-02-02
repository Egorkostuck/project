import { FC, useEffect } from 'react';

import { Paper, Center, Title, Button, useMantineTheme } from '@mantine/core';
import { FcGoogle } from 'react-icons/fc';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  color,
  buttonSize,
  buttonMT,
  centerMih,
  paperShadow,
  paperP,
  paperBg,
  paperTA,
} from 'components/layout/signIn/config';
import { ButtonVariant } from 'components/layout/signIn/types';
import FormSignIn from 'components/shared/formSignIn/FormSignIn';
import { useAppDispatch, RootState } from 'store/store';
import { userThunk } from 'store/user/userData.api';

const SignIn: FC = () => {
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const token = useSelector((state: RootState) => state.user.token);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const error = useSelector((state: RootState) => state.user.error);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    dispatch(userThunk.checkDocs(token));
  }, [token]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  const handleClick = async (): Promise<void> => {
    dispatch(userThunk.signInWithGoogle());
  };

  return (
    <Center mih={centerMih}>
      <Paper shadow={paperShadow} p={paperP} bg={paperBg} ta={paperTA}>
        <Title order={3}>Sign In</Title>

        {!user && !isLoggedIn && (
          <Button
            onClick={handleClick}
            mt={buttonMT}
            size={buttonSize}
            variant={ButtonVariant.White}
            color={theme.colors.dark[color]}
            leftSection={<FcGoogle size={14} />}
          >
            Sign in with Google
          </Button>
        )}

        {user && !isLoggedIn && !error && <FormSignIn />}
      </Paper>
    </Center>
  );
};

export default SignIn;
