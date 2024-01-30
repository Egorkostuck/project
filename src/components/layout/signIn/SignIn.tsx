import { FC, useEffect } from 'react';

import { Paper, Center, Title, Button, useMantineTheme } from '@mantine/core';
import { AuthError } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { checkUserInDB, signInWithPopupApi } from 'api/api';
import { color } from 'components/layout/signIn/config';
import FormSignIn from 'components/shared/formSignIn/FormSignIn';
import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  setUserIsLoggedIn,
} from 'store/user/userData.api';

const SignIn: FC = () => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const { user, token, isLoggedIn, error } = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    checkUserInDB(token)
      .then(userDoc => {
        if (userDoc?.name) {
          dispatch(setUserIsLoggedIn(true));
          navigate('/');
        }
      })
      .catch(error => {
        dispatch(setUserIsLoggedIn(false));
        dispatch(fetchUserFailure(error));
      });
  }, [token]);

  const handleClick = async (): Promise<void> => {
    dispatch(fetchUserRequest());

    await signInWithPopupApi()
      .then(data => {
        if (data) {
          dispatch(fetchUserSuccess(data));
        } else {
          dispatch(fetchUserFailure(data));
        }
      })
      .catch((error: AuthError) => {
        console.log('error', error);
      });
  };

  return (
    <Center mih="calc(100vh - 100px)">
      <Paper shadow="xs" p="xl" bg="var(--mantine-color-gray-light)" ta="center">
        <Title order={3}>Sign In</Title>

        {!user && !isLoggedIn && (
          <Button
            onClick={handleClick}
            mt="30"
            size="sm"
            variant="white"
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
