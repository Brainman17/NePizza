import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { setCurrentPage } from "../../redux/slices/filterSlice";
import styles from "./Pagination.module.scss";
import { useDispatch } from "react-redux";
import { FC } from "react";
import { Pizza } from "../../redux/slices/pizzasSlice";

type PaginationProps = {
  items: Pizza[];
  currentPage: number;
};

const Pagination: FC<PaginationProps> = ({ items, currentPage }) => {
  const dispatch = useDispatch();
  const handleChangePage = (currentPage: number) => {
    dispatch(setCurrentPage(currentPage));
  };

  return (
    <section className={styles.root}>
      <button className={styles.root__btnArrow} disabled={currentPage === 1}>
        <AiOutlineArrowLeft
          className={styles.root__btnArrowImage}
          onClick={() => handleChangePage(currentPage - 1)}
        />
      </button>
      <span className={styles.root__pageNumber}>{currentPage}</span>
      <button className={styles.root__btnArrow} disabled={items.length < 4}>
        <AiOutlineArrowRight
          className={styles.root__btnArrowImage}
          onClick={() => handleChangePage(currentPage + 1)}
        />
      </button>
    </section>
  );
};

export default Pagination;
