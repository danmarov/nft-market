import { Fragment, PropsWithChildren, useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import ErrorPage from "@/pages/error";
import { isTMA } from "@tma.js/sdk";
import { BrowserRouter } from "react-router";
import Container from "../layouts/container";

export default function Providers(props: PropsWithChildren) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkIsTma = async () => {
      try {
        const isTma = await isTMA();
        if (!isTma) {
          setError(true);
          return;
        }
        console.log(isTma);
        if (!isTma) {
          setError(true);
        }
      } catch (error) {
        console.log(error);
        setError(true);
        return;
      } finally {
        setLoading(false);
      }
    };
    checkIsTma();
    WebApp.disableVerticalSwipes();
    WebApp.expand();
    // WebApp.exitFullscreen();
  }, []);

  if (loading) {
    return null;
  }

  if (error) {
    return (
      <BrowserRouter>
        <Container>
          <ErrorPage
            title="403 Forbidden"
            message="Please open the app via telegram"
          />
        </Container>
      </BrowserRouter>
    );
  }
  return (
    <Fragment>
      <TonConnectUIProvider manifestUrl="https://ton-connect.github.io/demo-dapp-with-wallet/tonconnect-manifest.json">
        {props.children}
      </TonConnectUIProvider>
    </Fragment>
  );
}
