import { createContext, useContext } from 'react';

export type NotificationPayload = null | {
  type: 'error' | 'success';
  message?: string;
};

type NotificationContextShape = {
  notify: React.Dispatch<React.SetStateAction<NotificationPayload>>;
  notification: NotificationPayload;
};

export const NotificationContext = createContext<NotificationContextShape>({
  notify: () => {},
  notification: null,
});

export const useNotify = () => {
  return useContext(NotificationContext);
};
