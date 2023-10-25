import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../static/pizza-logo.png";
import basket from "../static/basket.svg";
import Search from "./Search";
import { selectCart } from "../redux/cart/selectors";
import { FC, useEffect, useRef } from "react";
import { setLocalStorage } from "../utils/localStorage";

const Header: FC = () => {
  const { pathname } = useLocation();
  const { items, totalPrice } = useSelector(selectCart);
  const isMounted = useRef(false);

  const totalCount = items
    ? items.reduce((sum: number, item: any) => {
        return sum + item.count;
      }, 0)
    : 0;

  // console.log("totalPrice > ", totalPrice);
  // console.log("items > ", items);

  // Сохраняем пиццы в LS
  useEffect(() => {
    if (isMounted.current) {
      // При первом рендере isMounted false и пиццы не в LS не сохраняются
      setLocalStorage("items", items);
      setLocalStorage("totalPrice", totalPrice);
    }
    isMounted.current = true;
  }, [items]);

  return (
    <div className="header">
      <div className="container">
        <Link to="/" className="header__logo">
          <img
            className="header__logo-image"
            width="38"
            src={logo}
            alt="Pizza logo"
          />
          <div>
            <h1>React Pizza</h1>
            <p>самая вкусная пицца во вселенной</p>
          </div>
        </Link>
        {pathname !== "/cart" && <Search />}
        <div className="header__cart">
          <Link to="/cart" className="button button--cart">
            <span>{totalPrice} ₽</span>
            <div className="button__delimiter"></div>
            <img className="header__basket" src={basket} alt="Корзина" />
            <span>{totalCount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
