import { Fragment, PropsWithChildren } from "react";
import Container from "./container";
import Header from "../common/header";
import Footer from "../common/footer";
import { BottomBar } from "@twa-dev/sdk/react";

interface MainLayoutProps extends PropsWithChildren {
  disableFooter?: boolean;
}

export default function MainLayout({
  children,
  disableFooter = false,
}: MainLayoutProps) {
  return (
    <Fragment>
      <Container>
        <Header />
        {children}
        {!disableFooter && (
          <BottomBar>
            <Footer />
          </BottomBar>
        )}
      </Container>
    </Fragment>
  );
}
