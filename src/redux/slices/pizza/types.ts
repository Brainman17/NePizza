export enum StatusEnum {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}
  
  // BLL
export type Pizza = {
    id: string;
    title: string;
    imageUrl: string;
    price: number;
    types: number[];
    sizes: number[];
    rating: number;
};
  
export interface pizzasSliceState {
    items: Pizza[];
    item: Pizza;
    status: StatusEnum.LOADING | StatusEnum.SUCCESS | StatusEnum.ERROR;
}