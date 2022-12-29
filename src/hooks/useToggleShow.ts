import { useEffect } from "react";
import { useToggle } from "ahooks";

export const useToggleShow = () => {
  const [show, { toggle }] = useToggle(true);

  useEffect(() => {
    if (show) window.addEventListener("click", toggle);

    return () => {
      window.removeEventListener("click", toggle);
    };
  }, [show]);

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

  return show;
};
