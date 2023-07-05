import { useEffect, useState } from 'react';

import { useNotify } from '../../context/NotificationContext';

import './NotificationCard.scss';
type NotificationCardProps = {};

export const NotificationCard = ({}: NotificationCardProps) => {
  const { notification } = useNotify();

  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 0);

    const hideTimeout = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  console.log('className', `container ${show ? 'container--show' : ''}`);

  return (
    <div
      className={`notification-card ${show ? 'notification-card--show' : ''} ${
        notification?.type === 'error' ? 'notification-card--error' : null
      }`}
    >
      {notification?.message}
    </div>
  );
};
