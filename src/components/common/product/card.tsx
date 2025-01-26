import { useRef } from "react";
import NFTBackground from "../nft-background";
import { GiftItem, TgsPlayerElement } from "@/lib/types";
import {
  formatNumber,
  forwardTelegramMessage,
  hexToRgb,
  toSlug,
} from "@/lib/utils";
import CustomIcon from "@/components/ui/icon";
import WebApp from "@twa-dev/sdk";
import { useNavigate } from "react-router";
const { VITE_BOT_USERNAME } = import.meta.env;

interface ProductCardProps {
  item: GiftItem;
}
const buttonClassName =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 h-10 w-10 shrink-0";

const buttonClassNameRounded =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground relative h-10 w-10 shrink-0 rounded-full fill-primary p-0";
export default function ProductCard(props: ProductCardProps) {
  const playerRef = useRef<TgsPlayerElement | null>(null);
  const centerColorRgb = hexToRgb(props.item.colors.center);
  const edgeColorRgb = hexToRgb(props.item.colors.edge);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    if (playerRef.current) {
      playerRef.current.seek(0);
      playerRef.current.play();
    }
  };

  const openCatalog = (item: { model?: string; backdrop?: string }) => {
    const { model, backdrop } = item;
    if (model) {
      return navigate(
        `/?name=${toSlug(props.item.name)}&model=${encodeURIComponent(model)}`
      );
    }
    if (backdrop) {
      return navigate(
        `/?name=${toSlug(props.item.name)}&background=${encodeURIComponent(
          backdrop
        )}`
      );
    }
  };

  const setEmojiStatus = (id: string) => {
    WebApp.setEmojiStatus(id);
  };

  return (
    <div className="flex flex-col w-full items-end justify-start p-4">
      <div className="w-full overflow-hidden rounded-md bg-card">
        <div className="w-full p-4 aspect-square">
          <div
            className="relative size-full overflow-hidden"
            onMouseEnter={handleMouseEnter}
          >
            <NFTBackground
              className="absolute inset-0"
              edgeColor={props.item.colors.edge}
              centerColor={props.item.colors.center}
              patternImage={props.item.patternImage}
            />
            <tgs-player
              ref={playerRef}
              mode="normal"
              src={props.item.tgs}
              style={{ width: "100%", height: "100%", padding: "3%" }}
            />
            <div
              className="absolute flex origin-bottom-left rotate-45 items-center justify-center rounded-sm font-medium h-8 -top-8 left-2/3 w-[47%]"
              style={{
                background: `radial-gradient(circle, rgb(${centerColorRgb.r}, ${centerColorRgb.g}, ${centerColorRgb.b}) 30%, rgb(${edgeColorRgb.r}, ${edgeColorRgb.g}, ${edgeColorRgb.b}) 100%)`,
              }}
            >
              <div className="whitespace-nowrap leading-none">
                <span>{formatNumber(props.item.availabilityIssued)}</span>
                <span>/</span>
                <span>{formatNumber(props.item.availabilityTotal)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 pt-0">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-2xl">{props.item.name}</div>
            <div className="font-semibold text-muted-foreground text-xl">
              #{props.item.gift_id}
            </div>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-2 pt-0">
          <div className="flex items-center justify-between">
            <div>Model</div>
            <button
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 hover:bg-accent rounded-md h-6 px-0 text-primary hover:text-primary"
              onClick={() =>
                openCatalog({ model: props.item.properties.model })
              }
            >
              {props.item.properties.model}
            </button>
          </div>
          <div className="flex items-center justify-between text-sm font-semibold">
            <div>Symbol</div>
            <div className="text-primary">{props.item.properties.symbol}</div>
          </div>
          <div className="flex items-center justify-between">
            <div>Backdrop</div>
            <button
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 hover:bg-accent rounded-md h-6 px-0 text-primary hover:text-primary"
              onClick={() =>
                openCatalog({ backdrop: props.item.properties.backdrop })
              }
            >
              {props.item.properties.backdrop}
            </button>
          </div>

          {!!props.item.customEmojiId && !!props.item.nftPreviewLink && (
            <div className="mt-1 flex w-full gap-3">
              <button
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-3 h-10 w-full"
                onClick={() => setEmojiStatus(props.item.customEmojiId!)}
              >
                Set as Emoji Status
              </button>

              <button
                className={buttonClassName}
                onClick={() => {
                  forwardTelegramMessage({
                    link: `t.me/${VITE_BOT_USERNAME}/nft?startapp=${props.item.gift_id}`,
                  });
                }}
              >
                <CustomIcon name="reply" />
              </button>
              <button
                className={buttonClassNameRounded}
                onClick={() => {
                  WebApp.openTelegramLink(props.item.nftPreviewLink!);
                }}
              >
                <CustomIcon name="telegram" className="size-10" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
