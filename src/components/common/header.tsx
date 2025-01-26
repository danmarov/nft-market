import { TonConnectButton } from "@tonconnect/ui-react";
import Balance from "./balance";

export default function Header() {
  return (
    <div className="sticky left-0 top-0 z-30 h-14 w-full border-b bg-popover">
      <div className="mx-auto h-full w-full px-2">
        <div className="flex h-full w-full items-center justify-between">
          <Balance />
          <TonConnectButton />
        </div>
      </div>
    </div>
  );
}
