import Image from "next/image";
import linkIcon from "@/assets/link-icon.png";

export const LinkIcon = () => {
  return <Image src={linkIcon} alt="" aria-hidden="true" width={14} height={14} />;
};
