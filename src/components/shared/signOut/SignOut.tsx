import { FC } from 'react';

import { NavLink } from '@mantine/core';
import { IoIosLogOut } from 'react-icons/io';

import { useAppDispatch } from 'store/store';
import { userThunk } from 'store/user/userData.api';

const SingOutButton: FC = () => {
  const dispatch = useAppDispatch();
  const handleClick = async (): Promise<void> => {
    dispatch(userThunk.signOut());
  };

  return (
    <NavLink href="/" leftSection={<IoIosLogOut size={24} />} onClick={handleClick} />
  );
};

export default SingOutButton;
