import { HTMLAttributes, useEffect, useRef } from "react";
// import * as LottiePlayer from "@lottiefiles/lottie-player";
import CustomIcon from "../../ui/icon";
import NFTBackground from "../nft-background";
import { GiftItem, TgsPlayerElement } from "@/lib/types";
import { cn, formatNumber, hexToRgb } from "@/lib/utils";
import { useNavigate } from "react-router";

interface CatalogCardProps extends HTMLAttributes<HTMLDivElement> {
  item: GiftItem;
}

const CatalogCard = (props: CatalogCardProps) => {
  const playerRef = useRef<TgsPlayerElement | null>(null);
  const centerColorRgb = hexToRgb(props.item.colors.center);
  const edgeColorRgb = hexToRgb(props.item.colors.edge);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (playerRef.current) {
        playerRef.current.play();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = () => {
    if (playerRef.current) {
      playerRef.current.seek(0);
      playerRef.current.play();
    }
  };

  return (
    <div
      className={cn(
        "w-full p-2 bg-card rounded-md border border-transparent",
        props.item.limited &&
          "shadow-[inset_0_0_4px_4px_rgba(255,166,0,0.2)] border-[rgba(255,166,0,0.8)]"
      )}
    >
      <div
        // to={"/gift"}
        role="button"
        onClick={() => {
          console.log(props.item);
          navigate(`/gift?gift_id=${props.item.gift_id}`);
        }}
        className="block mb-4 cursor-pointer aspect-square p-8 rounded-md relative overflow-hidden"
        style={{
          background: `radial-gradient(circle, rgb(${centerColorRgb.r}, ${centerColorRgb.g}, ${centerColorRgb.b}) 30%, rgb(${edgeColorRgb.r}, ${edgeColorRgb.g}, ${edgeColorRgb.b}) 100%)`,
        }}
        onMouseEnter={handleMouseEnter}
      >
        <NFTBackground
          className="absolute inset-0"
          edgeColor={props.item.colors.edge}
          centerColor={props.item.colors.center}
          patternImage={props.item.patternImage}
        />

        <div
          className={cn(
            "absolute flex origin-bottom-left rotate-45 items-center justify-center rounded-sm font-medium bg-gradient-to-l from-[#5c5c5c]/70 to-white/20 to-90% h-5 -top-5 text-xs left-[60%] w-[56%]",
            props.item.limited && "from-[#FF6A00] to-[rgba(255,166,0,0.8)]"
          )}
        >
          <div className="whitespace-nowrap leading-none">
            <span>{formatNumber(props.item.availabilityIssued)}</span>
            <span>/</span>
            <span>{formatNumber(props.item.availabilityTotal)}</span>
          </div>
        </div>
        <tgs-player
          ref={playerRef}
          mode="normal"
          src={props.item.tgs}
          style={{ width: "100%", height: "100%", padding: "3%" }}
        />
      </div>
      <div className="md:p-2 pt-0">
        <div className="flex items-center justify-between">
          <div
            className={cn(
              "font-semibold text-sm md:text-base",
              props.item.limited && "text-[rgba(255,166,0,1)]"
            )}
          >
            {props.item.name}
          </div>
          <div className="font-semibold text-muted-foreground text-sm">
            #{props.item.gift_id}
          </div>
        </div>
      </div>
      <div className="w-full md:p-2 pt-0 mt-2 md:mt-0">
        <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3 w-full gap-1">
          {props.item.price}
          <CustomIcon name="fragment" className="size-3" />
        </button>
      </div>
    </div>
  );
};

export default CatalogCard;
