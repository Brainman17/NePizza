import styles from "./UiPreloader.module.scss";
import Preloader from "../../static/cube.svg";

const UiPreloader = () => {
  return <img className={styles.loader} src={Preloader} alt="Preloader" />;
};

export default UiPreloader;
