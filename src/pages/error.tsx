import { ExternalLink } from "lucide-react";
import { Link } from "react-router";
const { VITE_BOT_USERNAME } = import.meta.env;
interface ErrorPageProps {
  title: string;
  message: string;
  path?: string;
}
export default function ErrorPage({
  message,
  title,
  path = `https://t.me/${VITE_BOT_USERNAME}`,
}: ErrorPageProps) {
  return (
    <div className="flex flex-col items-center pt-[30%] md:pt-[20%]">
      <div className="w-[45%] aspect-square">
        <tgs-player
          autoplay
          loop
          mode="normal"
          src="/duck.tgs"
          style={{ width: "100%", height: "100%", padding: "3%" }}
        />
      </div>
      <h1 className="text-2xl font-bold text-center mt-[5%]">{title}</h1>
      <p className="mt-1.5 text-[#ddd] text-sm text-center font-medium">
        {message}
      </p>
      <Link
        className="bg-white/10 block mx-auto mt-7 py-3 px-5 rounded-full w-fit"
        to={path}
      >
        <ExternalLink size={18} strokeWidth={2.5} />
      </Link>
    </div>
  );
}
