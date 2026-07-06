import { TOrder } from '@utils-types';

export type TOrderModalData = {
  number: number;
};

export type BurgerConstructorUIProps = {
  constructorItems: any;
  orderRequest: boolean;
  price: number;
  orderModalData: TOrderModalData | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
};
