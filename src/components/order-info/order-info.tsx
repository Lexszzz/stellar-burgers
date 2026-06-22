import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { getOrderByNumberThunk } from '../../services/slices/feedSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams();

  const dispatch = useDispatch();

  const { orders, currentOrder } = useSelector((state) => state.feed);

  const { orders: profileOrders } = useSelector((state) => state.profileOrders);

  const orderData =
    orders.find((order) => order.number === Number(number)) ||
    profileOrders.find((order) => order.number === Number(number)) ||
    currentOrder;

  useEffect(() => {
    if (!orderData && number) {
      dispatch(getOrderByNumberThunk(Number(number)));
    }
  }, [dispatch, orderData, number]);

  const ingredients = useSelector((state) => state.ingredients.ingredients);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
