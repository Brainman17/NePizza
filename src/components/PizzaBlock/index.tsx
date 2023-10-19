import { FC, useState } from "react";
import add from "../../static/add.svg";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slices/cart/slice";
import { selectCart } from "../../redux/slices/cart/selectors";
import { CartItem } from "../../redux/slices/cart/types";
import { Link } from "react-router-dom";
import { Pizza } from "../../redux/slices/pizza/types";

const typeNames = ["тонкое", "традиционное"];

const PizzaBlock: FC<Pizza> = ({
  id,
  title,
  imageUrl,
  price,
  sizes,
  types,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isSizeActive, setIsSizeActive] = useState<number>(0);
  const [isTypeActive, setIsTypeActive] = useState<number>(0);

  const dispatch = useDispatch();

  const onClickAdd = () => {
    const objItem: CartItem = {
      id: id,
      title: title,
      imageUrl: imageUrl,
      price: price,
      type: typeNames[isTypeActive],
      size: sizes[isSizeActive],
      count: 0,
    };

    dispatch(addItem(objItem));
  };

  const { items } = useSelector(selectCart);

  const cartItem = items.find((obj: any) => obj.id === id);

  const addedCount = cartItem ? cartItem.count : 0;

  return (
    <div className="pizza-block">
      <Link to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </Link>
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((typeId) => {
            return (
              <li
                key={typeId}
                onClick={() => {
                  setIsTypeActive(typeId);
                }}
                className={
                  isTypeActive === typeId || types.length === 1 ? "active" : ""
                }
              >
                {typeNames[typeId]}
              </li>
            );
          })}
        </ul>
        <ul>
          {sizes.map((size, index) => (
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
        <div className="pizza-block__price">от {price} ₽</div>
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
