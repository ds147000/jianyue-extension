import styles from "./style.module.scss";

export interface ShopCardProps {
  imgUrl?: string;
  title?: string;
  price?: number
}

export const ShopCard: React.FC<ShopCardProps> = ({ title, price, imgUrl }) => {
    return (
        <div className={styles.card}>
            <img className={styles.img} src={imgUrl} alt="logo" />
            <div>
              <h3 className={styles.title}>{title}</h3>
              <span className={styles.price}>
                Price(UDS): <span className={styles.priceValue}>{price}</span>
              </span>
            </div>
        </div>
    )
}