import { CartItem } from "../redux/cart/types";
import { Sort } from "../redux/filter/types";

export const getLocalStorage = (key: string) => {
    const data = localStorage.getItem(key);
    if(data !== null) {
        return JSON.parse(data);
    } return {}
}

export const setLocalStorage = (key: string, data: CartItem[] | number | Sort | string) => {
    localStorage.setItem(key, JSON.stringify(data))
}

