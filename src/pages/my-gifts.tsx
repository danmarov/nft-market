import { ExternalLink } from "lucide-react";
import { Link } from "react-router";

export default function MyGifts() {
  return (
    <div className="flex flex-col items-center pt-[25%] md:pt-[20%]">
      <div className="w-[45%] aspect-square">
        <tgs-player
          autoplay
          loop
          mode="normal"
          src="/cool-duck.tgs"
          style={{ width: "100%", height: "100%", padding: "3%" }}
        />
      </div>
      <h1 className="text-2xl font-bold text-center mt-[5%]">
        You have no gifts yet
      </h1>
      <p className="mt-1.5 text-[#ddd] text-sm text-center font-medium">
        Explore our marketplace and buy some gifts
      </p>
      <Link
        className="bg-white/10 block mx-auto mt-7 py-3 px-5 rounded-full w-fit"
        to={"/"}
      >
        <ExternalLink size={18} strokeWidth={2.5} />
      </Link>
    </div>
  );
}
