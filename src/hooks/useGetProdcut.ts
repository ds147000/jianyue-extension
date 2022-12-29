import { useEffect, useState } from "react";
import { ShopCardProps } from "../components/ShopCard";
import { debounce } from "lodash";

export const useGetProdcut = () => {
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

  return { num, maxShop, minShop };
};
