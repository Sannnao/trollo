import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import {
  Layout,
} from '../../components';

export const MainPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('tasks-board');
  }, [])

  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}
