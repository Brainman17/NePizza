import { useCallback, useRef, useState } from "react";
import styles from "./Search.module.scss";
import clearIcon from "../../static/free-icon-close-3926754.png";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 1000),
    []
  );

  const onChangeInput = (evt) => {
    setValue(evt.target.value);
    updateSearchValue(evt.target.value);
  };

  const inputRef = useRef();

  const onClickClear = () => {
    inputRef.current.focus();
    setValue("");
    dispatch(setSearchValue(""));
  };

  return (
    <form className={styles.form}>
      <input
        className={styles.form__input}
        type="text"
        placeholder="Поиск пиццы ..."
        value={value}
        onChange={onChangeInput}
        ref={inputRef}
      ></input>
      {value && (
        <img
          src={clearIcon}
          alt="clear icon"
          className={styles.form__clear}
          onClick={onClickClear}
        />
      )}
    </form>
  );
};

export default Search;
