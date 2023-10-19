import axios from "axios";
import { useEffect, FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASEURL } from "../constants/api";
import { useDispatch, useSelector } from "react-redux";
import { setPizzaItem } from "../redux/pizza/slice";
import { selectPizzaData } from "../redux/pizza/selectors";

const FullPizza: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { item } = useSelector(selectPizzaData);

  useEffect(() => {
    try {
      (async () => {
        const res = await axios.get(`${BASEURL}/${id}`);
        dispatch(setPizzaItem(res.data));
      })();
    } catch (error) {
      console.log(error);
      alert("Ошибка при получении пиццы");
      navigate("/");
    }
  }, [dispatch, id, navigate]);

  return (
    <div className="container content">
      {item && (
        <>
          <img src={item.imageUrl} alt={item.title} />
          <h2>{item.title}</h2>
          <h4>{item.price} ₽</h4>
        </>
      )}
    </div>
  );
};

export default FullPizza;
