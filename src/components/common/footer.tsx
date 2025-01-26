import { Link, useLocation } from "react-router";
import CustomIcon, { IconName } from "../ui/icon";
import { cn } from "@/lib/utils";
import WebApp from "@twa-dev/sdk";
const { VITE_SELLER_USERNAME } = import.meta.env;

interface NavItem {
  href: string;
  icon: IconName;
  title: string;
  disabled?: boolean;
}
const navigation: NavItem[] = [
  {
    href: "/",
    icon: "market",
    title: "Market",
  },
  {
    href: "/gifts",
    icon: "gift",
    title: "My Gifts",
  },
  {
    href: "/activity",
    icon: "activity",
    title: "Activity",
    disabled: true,
  },
];

interface MenuIconProps {
  active?: boolean;
  href: string;
  icon: IconName;
  title: string;
  disabled?: boolean;
}
const MenuLink = ({
  active = false,
  href,
  icon,
  title,
  disabled = false,
}: MenuIconProps) => {
  return (
    <Link
      to={href}
      className="h-full flex-1 active"
      onClick={(e) => {
        if (disabled) e.preventDefault();
      }}
    >
      <div
        className={cn(
          "flex h-full flex-col items-center justify-center rounded-md text-sm font-semibold hover:bg-primary/5",
          active && "bg-primary/10 text-primary hover:bg-primary/10",
          disabled && "opacity-40"
        )}
      >
        <CustomIcon name={icon} />
        {title}
      </div>
    </Link>
  );
};

export default function Footer() {
  const location = useLocation();
  const pathname = location.pathname;

  const currentPathname = () => {
    if (pathname.includes("activity")) return "/activity";
    if (pathname.includes("gifts")) return "/gifts";
    return "/";
  };

  return (
    <footer className="relative">
      <div className="fixed bottom-0 left-0 h-20 w-full">
        {pathname.includes("/gifts") && (
          <div className="text-sm fixed bottom-20 flex h-10 max-w-screen-sm left-1/2 -translate-x-1/2  w-full items-center justify-center bg-card">
            <div className="text-muted-foreground">
              Want to sell your Gift? Transfer it to{" "}
            </div>
            <button
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 rounded-md h-6 px-1 text-primary hover:bg-primary/20 hover:text-primary"
              onClick={() => {
                WebApp.openTelegramLink(`https://t.me/${VITE_SELLER_USERNAME}`);
              }}
            >
              @{VITE_SELLER_USERNAME}
            </button>
          </div>
        )}
        <div
          className={cn(
            "mx-auto h-full w-full bg-popover max-w-screen-sm px-3 pb-4 pt-2"
          )}
        >
          <div className="flex h-full items-center gap-3">
            {navigation.map(({ href, icon, title, disabled }) => (
              <MenuLink
                key={title}
                href={href}
                icon={icon}
                title={title}
                disabled={disabled}
                active={currentPathname() === href}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
