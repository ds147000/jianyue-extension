import { useEffect, useState } from "react";
import classnames from "classnames";
import { ShopCard, ShopCardProps } from "../../components/ShopCard";
import styles from "./style.module.scss";
import { useGetProdcut } from "../../hooks/useGetProdcut";
import { useToggleShow } from "../../hooks/useToggleShow";

const Popup: React.FC = () => {
  const { num, maxShop, minShop } = useGetProdcut();
  const show = useToggleShow();

  return (
    <div>
      {show && <div className={styles.mask} />}

      <div
        className={classnames(show ? styles.show : styles.hide, styles.popup)}
        onClick={(evt) => evt.stopPropagation()}
      >
        <h1 className={styles.title}>概述</h1>
        <div className={styles.head}>
          <div className={styles.headItem}>
            <h5>本页产品数量</h5>
            <h4>{num}</h4>
          </div>
          <div className={styles.headItem}>
            <h5>本页产品中最高价格</h5>
            <h4>{maxShop?.price ? `$${maxShop.price}` : "$0"}</h4>
          </div>
          <div className={styles.headItem}>
            <h5>本页产品中最低价格</h5>
            <h4>{minShop?.price ? `$${minShop.price}` : "$0"}</h4>
          </div>
        </div>

        <h2 className={styles.title}>详情</h2>
        {!!maxShop && (
          <div>
            <span className={styles.tips}>本页产品中最高价格的产品</span>

            <ShopCard {...maxShop} />
          </div>
        )}

        {!!minShop && (
          <div>
            <span className={styles.tips}>本页产品中最低价格的产品</span>

            <ShopCard {...minShop} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
