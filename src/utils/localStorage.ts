import { calcTotalPrice } from './calcTotalPrice';
import { CartItem } from "../redux/cart/types";
import { Sort, SortPropertyEnum } from "../redux/filter/types";

export const getCartFromLS = () => {
    const data = localStorage.getItem('items');
    const items = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(items)

    return {
        items, 
        totalPrice
    }
}

export const getCategoryIdFromLS = () => {
    const data = localStorage.getItem('categoryId');
    const json = data ? JSON.parse(data) : 0;

    return json;
}
export const getCurrentPageFromLS = () => {
    const data = localStorage.getItem('currentPage');
    const json = data ? JSON.parse(data) : 1;

    return json;
}
export const getSortTypeFromLS = () => {
    const data = localStorage.getItem('sortType');
    const json = data ? JSON.parse(data) : {
        name: 'популярности',
        sortProperty: SortPropertyEnum.RATING_DESC,
      };

    return json;
}

export const setLocalStorage = (key: string, data: CartItem[] | number | Sort | string) => {
    localStorage.setItem(key, JSON.stringify(data))
}

