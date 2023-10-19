import { Sort } from '../redux/slices/filter/types';
import { SortPropertyEnum } from '../redux/slices/filter/types';

const sortArray: Sort[] = [
  {
    name: "популярности(DESC)",
    sortProperty: SortPropertyEnum.RATING_ASC,
  },
  {
    name: "популярности(ASC)",
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
  {
    name: "цене(DESC)",
    sortProperty: SortPropertyEnum.PRICE_ASC,
  },
  {
    name: "цене(ASC)",
    sortProperty: SortPropertyEnum.PRICE_DESC,
  },
  {
    name: "алфавиту(DESC)",
    sortProperty: SortPropertyEnum.TITLE_ASC,
  },
  {
    name: "алфавиту(ASC)",
    sortProperty: SortPropertyEnum.TITLE_DESC,
  }
];

export default sortArray;
