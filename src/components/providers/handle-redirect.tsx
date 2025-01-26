import WebApp from "@twa-dev/sdk";
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router";

export default function HandleRedirect({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  useEffect(() => {
    WebApp.disableVerticalSwipes();
    WebApp.expand();

    const startParam = Number(
      WebApp.initDataUnsafe.start_param?.replace("product_", "")
    );
    if (!isNaN(startParam)) {
      navigate(`/gift?gift_id=${startParam}`);
    }
  }, []);
  return <>{children} </>;
}
