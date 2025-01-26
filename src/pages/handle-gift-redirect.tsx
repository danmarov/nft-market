import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function HandleGiftRedirectPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const startParam = Number(WebApp.initDataUnsafe.start_param || "uknown");

    navigate(`/gift?gift_id=${startParam}`);
  }, []);
  return null;
}
