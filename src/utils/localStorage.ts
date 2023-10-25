import { calcTotalPrice } from './calcTotalPrice';
import { CartItem } from "../redux/cart/types";
import { Sort } from "../redux/filter/types";

export const getCartFromLS = () => {
    const data = localStorage.getItem('items');
    const items = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(items)

    return {
        items, 
        totalPrice
    }
}

export const getLocalStorage = (key: string) => {
    const data = localStorage.getItem(key);
    if(data !== null) {
        return JSON.parse(data);
    } return []
}

export const setLocalStorage = (key: string, data: CartItem[] | number | Sort | string) => {
    localStorage.setItem(key, JSON.stringify(data))
}

