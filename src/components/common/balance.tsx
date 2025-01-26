import { HTMLAttributes } from "react";
import CustomIcon from "../ui/icon";
// import { forwardTelegramMessage } from "@/lib/utils";
// import WebApp from "@twa-dev/sdk";
// const { VITE_BOT_USERNAME } = import.meta.env;

const RoundButton = (props: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-8 w-8 rounded-full"
      {...props}
    />
  );
};

export default function Balance() {
  return (
    <div className="flex items-center gap-1">
      <div className="flex h-10 items-center gap-3 rounded-full bg-secondary pl-4 pr-1">
        <div className="flex items-center gap-1">
          <div className="text-sm font-semibold">0</div>
          <CustomIcon className="w-3" name="fragment" />
        </div>
        <div className="flex items-center gap-1">
          <RoundButton title="plus">
            <CustomIcon name="plus" />
          </RoundButton>

          <RoundButton title="minus">
            <CustomIcon name="minus" />
          </RoundButton>
        </div>
      </div>

      {/* <RoundButton
        title="share"
        onClick={() => {
          const userId = WebApp.initDataUnsafe.user?.id;
          forwardTelegramMessage({
            link: `t.me/${VITE_BOT_USERNAME}?start=${userId}`,
          });
        }}
      >
        <CustomIcon name="share" />
      </RoundButton> */}
    </div>
  );
}
