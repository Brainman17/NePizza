import { FC, useState } from "react";
import add from "../../static/add.svg";
import { useDispatch, useSelector } from "react-redux";
import { addItem, selectCart } from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";

const typeNames: string[] = ["тонкое", "традиционное"];

type PizzaBlockProps = {
  pizza: {
    id: string;
    title: string;
    imageUrl: string;
    price: number;
    types: number[];
    sizes: number[];
    rating: number;
  };
};

const PizzaBlock: FC<PizzaBlockProps> = ({ pizza }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isSizeActive, setIsSizeActive] = useState<number>(0);
  const [isTypeActive, setIsTypeActive] = useState<number>(0);

  const dispatch = useDispatch();

  const onClickAdd = () => {
    const objItem = {
      id: pizza.id,
      title: pizza.title,
      imageUrl: pizza.imageUrl,
      price: pizza.price,
      type: typeNames[isTypeActive],
      size: pizza.sizes[isSizeActive],
    };

    dispatch(addItem(objItem));
  };

  const { items } = useSelector(selectCart);

  const cartItem = items.find((obj: any) => obj.id === pizza.id);

  const addedCount = cartItem ? cartItem.count : 0;

  return (
    <div className="pizza-block">
      <Link to={`/pizza/${pizza.id}`}>
        <img className="pizza-block__image" src={pizza.imageUrl} alt="Pizza" />
      </Link>
      <h4 className="pizza-block__title">{pizza.title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {pizza.types.map((typeId) => {
            return (
              <li
                key={typeId}
                onClick={() => {
                  setIsTypeActive(typeId);
                }}
                className={
                  isTypeActive === typeId || pizza.types.length === 1
                    ? "active"
                    : ""
                }
              >
                {typeNames[typeId]}
              </li>
            );
          })}
        </ul>
        <ul>
          {pizza.sizes.map((size, index) => (
            <li
              onClick={() => {
                setIsSizeActive(index);
              }}
              className={index === isSizeActive ? "active" : ""}
              key={index}
            >
              {size}
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {pizza.price} ₽</div>
        <button
          onMouseOver={() => setIsActive(true)}
          onMouseOut={() => setIsActive(false)}
          onClick={onClickAdd}
          className="button button--outline button--add"
        >
          {isActive && (
            <img className="pizza-block__add-svg" src={add} alt="add" />
          )}
          <span>Добавить</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;
