import { useRef, useState, useEffect, FC, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import sortArrowUp from "../static/sort-arrow-up.svg";
import sortArrowDown from "../static/sort-arrow-down.png";
import sortArray from "../utils/config";
import { setSortType } from "../redux/filter/slice";
import { selectFilter } from "../redux/filter/selectors";

const Sort: FC = () => {
  const dispatch = useDispatch();
  const { sortType } = useSelector(selectFilter);
  const [isOpen, setIsOpen] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);

  const handlePopup = (bool: boolean) => {
    setIsOpen(bool);
  };

  useEffect(() => {
    const handleClickOutside = (evt: MouseEvent) => {
      const pathArray = evt.composedPath();

      if (sortRef.current && !pathArray.includes(sortRef.current)) {
        handlePopup(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <b>Сортировка по:</b>
        <span
          onClick={() => {
            handlePopup(true);
          }}
        >
          {sortType.name}
        </span>
        {isOpen ? (
          <img width="10" src={sortArrowDown} alt="Стрелка вниз" />
        ) : (
          <img src={sortArrowUp} alt="Стрелка вверх" />
        )}
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {sortArray.map((obj, index) => {
              return (
                <li
                  key={index}
                  className={
                    sortType.sortProperty === obj.sortProperty ? "active" : ""
                  }
                  onClick={() => {
                    dispatch(setSortType(obj));
                    handlePopup(false);
                  }}
                >
                  {obj.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default memo(Sort);
