import { PropsWithChildren } from "react";

export default function Container({ children }: PropsWithChildren) {
  return <main className="max-w-screen-sm mx-auto min-h-svh">{children}</main>;
}
