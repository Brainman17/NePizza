import { FC } from "react";

type CategoriesProps = {
  categoryId: number;
  onChangeCategory: (i: number) => void;
};

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories: FC<CategoriesProps> = ({ categoryId, onChangeCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => {
          return (
            <li
              key={index}
              className={categoryId === index ? "active" : ""}
              onClick={() => onChangeCategory(index)}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
