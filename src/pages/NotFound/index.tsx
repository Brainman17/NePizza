import { FC } from "react";
import styles from "./NotFound.module.scss";
import errorImg from "../../static/404-error.png";
import smile from "../../static/thinking.png";

const NotFound: FC = () => {
  return (
    <div className={styles.wrap}>
      <img className={styles.wrap__img} src={errorImg} alt="error" />
      <span className={styles.wrap__span}>
        Ничего не найдено
        <img className={styles.wrap__smile} src={smile} alt="smile" />
      </span>
    </div>
  );
};

export default NotFound;
