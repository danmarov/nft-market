import ProductCard from "@/components/common/product/card";
import { ProductCardSkeleton } from "@/components/common/product/card.skeleton";
import { BottomBar, MainButton, BackButton } from "@twa-dev/sdk/react";
import MainLayout from "@/components/layouts/main-layout";
import { useCatalogItems } from "@/hooks/useCatalogItems";
import { GiftItem } from "@/lib/types";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import ErrorPage from "./error";
import WebApp from "@twa-dev/sdk";

export default function GiftPage() {
  const navigate = useNavigate();
  const { fetchProduct } = useCatalogItems();
  const [searchParams] = useSearchParams();
  const gift_id = searchParams.get("gift_id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{
    title: string;
    message: string;
  } | null>(null);
  const [product, setProduct] = useState<GiftItem | null>(null);

  const goBack = () => {
    const currentPath = window.location.pathname;
    window.history.go(-1);
    setTimeout(() => {
      if (window.location.pathname === currentPath) {
        navigate("/");
      }
    }, 100);
  };

  useEffect(() => {
    const fetch = async () => {
      if (!gift_id || isNaN(Number(gift_id))) {
        setLoading(false);
        return setError({
          title: "Something went wrong..",
          message: "Sorry, we couldn't find the page you are looking for.",
        });
      }
      const product = await fetchProduct(Number(gift_id));
      if (!product) {
        setLoading(false);

        return setError({
          title: "404 Not Found",
          message: "Sorry, we couldn't find the page you are looking for.",
        });
      }
      setProduct(product);
      setLoading(false);
    };
    fetch();
  }, [gift_id]);

  if (loading) {
    return (
      <MainLayout>
        <ProductCardSkeleton />
      </MainLayout>
    );
  }

  if (error && !loading && !product) {
    return (
      <MainLayout>
        <ErrorPage {...error} path="/" />
      </MainLayout>
    );
  }

  return (
    <MainLayout disableFooter>
      <Fragment>{product && <ProductCard item={product} />}</Fragment>
      <BottomBar>
        <MainButton
          text={`Buy ${product!.price} TON`}
          onClick={() => WebApp.HapticFeedback.notificationOccurred("error")}
          //   progress={true}
          //   hasShineEffect
          color="#0098eb"
        />
        {/* <SecondaryButton
          text="Cancel"
          position="bottom"
          onClick={() => alert("cancelled")}
        /> */}
      </BottomBar>
      <BackButton onClick={goBack} />
    </MainLayout>
  );
}
