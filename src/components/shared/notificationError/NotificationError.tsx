import { FC } from 'react';

import { Notification } from '@mantine/core';
import { MdOutlineError } from 'react-icons/md';

import {
  colorIcon,
  iconSizeRem,
  styles,
} from 'components/shared/notificationError/config';

interface Props {
  error: string;
}
const NotificationError: FC<Props> = ({ error }) => {
  const closeButtonProps = {
    'aria-label': 'Hide notification',
    style: { cursor: 'pointer' },
  };

  return (
    <Notification
      id="error"
      withCloseButton={false}
      closeButtonProps={closeButtonProps}
      style={styles}
      icon={<MdOutlineError color={colorIcon} size={iconSizeRem} />}
      color="transparent"
      title="Error"
    >
      {error}
    </Notification>
  );
};

export default NotificationError;
