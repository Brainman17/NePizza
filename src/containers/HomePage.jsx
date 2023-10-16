import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import ServerError from "../components/ServerError";
import {
  selectFilter,
  setCategoryId,
  setFilters,
} from "../redux/slices/filterSlice";
import sortArray from "../utils/config";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzasSlice";

const HomePage = ({ setCount, count }) => {
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  // useSelector
  const { sortType, categoryId, currentPage, searchValue } =
    useSelector(selectFilter);

  const { items, status } = useSelector(selectPizzaData);

  // useDispatch
  const dispatch = useDispatch();

  // useNavigate
  const navigate = useNavigate();

  // useEffect
  const getPizzas = () => {
    const category = categoryId > 0 ? `&category=${categoryId}` : "";
    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const titleValue = searchValue && `&title=${searchValue}`;

    dispatch(fetchPizzas({ currentPage, category, sortBy, order, titleValue }));
  };

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        currentPage,
        categoryId,
        sortProperty: sortType.sortProperty,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sortType, currentPage, navigate]);

  // Если был первый рендер, то проверяем URL-параметры и сохраняем их в Редаксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.slice(1));
      const sortType = sortArray.find(
        (sort) => sort.sortProperty === params.sortProperty
      );

      dispatch(setFilters({ ...params, sortType }));
      isSearch.current = true;
    }
  }, [dispatch]);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);

    getPizzas();

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  // functions
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  // const filterItems = items.filter((p) =>
  //   p.title.toLowerCase().includes(searchValue.toLowerCase())
  // );

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories
            categoryId={categoryId}
            onChangeCategory={onChangeCategory}
          />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {status === "success" ? (
            items.map((pizza) => {
              return (
                <PizzaBlock
                  key={pizza.id}
                  pizza={pizza}
                  setCount={setCount}
                  count={count}
                />
              );
            })
          ) : status === "loading" ? (
            skeletons && status === "error"
          ) : (
            <ServerError />
          )}
        </div>
      </div>
      <Pagination items={items} currentPage={currentPage} />
    </div>
  );
};

export default HomePage;
