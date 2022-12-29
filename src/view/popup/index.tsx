import { useToggle } from "ahooks";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import classnames from "classnames";
import { ShopCard, ShopCardProps } from "../../components/ShopCard";
import styles from "./style.module.scss";

const Popup: React.FC = () => {
  const [show, { toggle }] = useToggle(true);
  const [num, setNum] = useState<number>(0);
  const [maxShop, setMaxShop] = useState<ShopCardProps>();
  const [minShop, setMinShop] = useState<ShopCardProps>();

  useEffect(() => {
    function Dom2ShopObj(el: Element): ShopCardProps {
      return {
        imgUrl: el.querySelector("img")?.src || "",
        title: el.querySelector("a.css-901oao")?.textContent || "",
        price: Number(
          el
            .querySelector("div.css-901oao.r-cqee49.r-61z16t")
            ?.textContent?.slice(1)
        ),
      };
    }

    const refreshShop = debounce(() => {
      const ElDom = document.querySelectorAll(".collection-list__product-tile");

      setNum(ElDom.length);

      if (ElDom.length === 0) return;
      let max = Dom2ShopObj(ElDom[0]),
        min = Dom2ShopObj(ElDom[0]);

      for (let i = 1; i < ElDom.length; i++) {
        const item = Dom2ShopObj(ElDom[i]);
        if (max.price! < item.price!) max = item;
        if (min.price! > item.price!) min = item;
      }

      setMaxShop(max);
      setMinShop(min);
    }, 500);

    refreshShop();

    window.addEventListener("scroll", refreshShop);

    return () => {
      window.removeEventListener("scroll", refreshShop);
    };
  }, []);

  useEffect(() => {
    window?.chrome?.runtime?.onMessage?.addListener(function (
      request,
      sender,
      sendResponse
    ) {
      if (request.greeting === "show") toggle();

      sendResponse({ status: "ok" });
    });
  }, []);

  useEffect(() => {
    if (show) window.addEventListener("click", toggle);

    return () => {
      window.removeEventListener("click", toggle);
    }
  }, [show])

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
