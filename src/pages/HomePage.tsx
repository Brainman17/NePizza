import { useEffect, useRef, FC, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import ServerError from "../components/ServerError";
import { useAppDispatch } from "../redux/store";
import { StatusEnum } from "../redux/pizza/types";
import { setLocalStorage } from "../utils/localStorage";
import { selectFilter } from "../redux/filter/selectors";
import { setCategoryId } from "../redux/filter/slice";
import { selectPizzaData } from "../redux/pizza/selectors";
import { fetchPizzas } from "../redux/pizza/asyncActions";

const HomePage: FC = () => {
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  // useSelector
  const { sortType, categoryId, currentPage, searchValue } =
    useSelector(selectFilter);

  const { items, status } = useSelector(selectPizzaData);

  // useDispatch
  const dispatch = useAppDispatch();

  // useNavigate
  const navigate = useNavigate();

  // useEffect
  const getPizzas = () => {
    const category = categoryId > 0 ? `&category=${categoryId}` : "";
    const sortBy = sortType.sortProperty.replace("-", "");
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const titleValue = searchValue && `&title=${searchValue}`;

    dispatch(
      fetchPizzas({
        currentPage: String(currentPage),
        category,
        sortBy,
        order,
        titleValue: String(titleValue),
      })
    );
  };

  // // Если изменили параметры и был первый рендер
  // useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       currentPage,
  //       categoryId,
  //       sortProperty: sortType.sortProperty,
  //     });

  //     navigate(`?${queryString}`);
  //   }

  //   isMounted.current = true;
  // }, [categoryId, sortType, currentPage, navigate]);

  // // Если был первый рендер, то проверяем URL-параметры и сохраняем их в Redux
  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(
  //       window.location.search.slice(1) as unknown as FetchPizzasParams
  //     );
  //     const sortType = sortArray.find(
  //       (sort) => sort.sortProperty === params.sortBy
  //     );

  //     dispatch(
  //       setFilters({
  //         searchValue: String(params.titleValue),
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sortType: sortType || sortArray[0],
  //       })
  //     );

  //     isSearch.current = true;
  //   }
  // }, [dispatch]);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);

    getPizzas();

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    setLocalStorage("currentPage", currentPage);
    setLocalStorage("categoryId", categoryId);
    setLocalStorage("sortType", sortType);
    setLocalStorage("searchValue", searchValue);
  }, [currentPage, categoryId, sortType, searchValue]);

  // functions
  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  // const filterItems = items.filter((p) =>
  //   p.title.toLowerCase().includes(searchValue.toLowerCase())
  // );

  const itemsMap = items.map((pizza: any) => {
    return <PizzaBlock key={pizza.id} {...pizza} />;
  });

  const itemsRender = () => {
    if (status === StatusEnum.SUCCESS) {
      return itemsMap;
    } else if (status === StatusEnum.LOADING) {
      return skeletons;
    } else if (status === StatusEnum.ERROR) {
      return <ServerError />;
    }
  };

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
        <div className="content__items">{itemsRender()}</div>
      </div>
      <Pagination items={items} currentPage={currentPage} />
    </div>
  );
};

export default HomePage;
