import { Link } from "react-router-dom";

const ServerError = () => {
  return (
    <div className="content">
      <div className="container container--cart">
        <div className="cart cart--empty">
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p style={{ marginBottom: "20px", marginTop: "20px" }}>
            Не удалось получить пиццы. Повторите попытку позже!
          </p>
          <Link to="/" className="button button--black">
            <span>Вернуться назад</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServerError;
