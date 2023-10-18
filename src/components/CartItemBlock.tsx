import { useDispatch } from "react-redux";
import plus from "../static/plus.svg";
import minus from "../static/minus.svg";
import deleteBasket from "../static/delete.png";
import { addItem, removeItem, minusItem } from "../redux/slices/cartSlice";
import { FC } from "react";
import { CartItem } from "../redux/slices/cartSlice";

const CartItemBlock: FC<CartItem> = ({
  id,
  imageUrl,
  price,
  title,
  type,
  size,
  count,
}) => {
  const dispatch = useDispatch();

  const onClickPlus = () => {
    dispatch(addItem({ id } as CartItem));
  };

  const onClickMinus = () => {
    dispatch(minusItem(id));
  };

  const onClickRemove = () => {
    if (window.confirm("Ты точно хочешь удалить пиццу?")) {
      dispatch(removeItem(id));
    }
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {type} тесто, {size} см.
        </p>
      </div>
      <div className="cart__item-count">
        <button
          onClick={onClickMinus}
          className="button button--outline button--circle cart__item-count-minus"
        >
          <img src={minus} alt="plus" />
        </button>
        <b>{count}</b>
        <button
          onClick={onClickPlus}
          className="button button--outline button--circle cart__item-count-plus"
        >
          <img src={plus} alt="plus" />
        </button>
      </div>
      <div className="cart__item-price">
        <b>{price * count} ₽</b>
      </div>
      <div className="cart__item-remove" onClick={onClickRemove}>
        <img src={deleteBasket} alt="plus" className="button--delete" />
      </div>
    </div>
  );
};

export default CartItemBlock;
