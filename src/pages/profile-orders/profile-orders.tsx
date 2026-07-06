import { FC, useEffect } from 'react';
import { ProfileOrdersUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';

import { getProfileOrdersThunk } from '../../services/slices/profileOrdersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.profileOrders);

  useEffect(() => {
    dispatch(getProfileOrdersThunk());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
