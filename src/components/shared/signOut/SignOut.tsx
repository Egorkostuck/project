import { FC } from 'react';

import { NavLink } from '@mantine/core';
import { IoIosLogOut } from 'react-icons/io';
import { useDispatch } from 'react-redux';

import { signOutApi } from 'api/api';
import { clearUserData } from 'store/user/userData.api';

const SingOutButton: FC = () => {
  const dispatch = useDispatch();
  const handleClick = (): void => {
    signOutApi();
    dispatch(clearUserData());
    localStorage.removeItem('uid');
  };

  return (
    <NavLink href="/" leftSection={<IoIosLogOut size={24} />} onClick={handleClick} />
  );
};

export default SingOutButton;
