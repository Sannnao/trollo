import { useNotify } from 'context/NotificationContext';
import { NotificationCard } from './NotificationCard';
import './notification.scss';

type NotificationProps = {};

export const Notification = ({}: NotificationProps) => {
  const { notification } = useNotify();

  return notification ? (
    <div className="notification">
      <NotificationCard />
    </div>
  ) : null;
};
