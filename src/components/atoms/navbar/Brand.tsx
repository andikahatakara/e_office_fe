import { logo } from "@/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Brand = () => {
  return (
    <Link href={"/"} className="blcok text-white">
      <span className="sr-only">Home</span>
      <span className="relative flex h-10 sm:h-12 w-48 lg:w-64">
        <Image
          src={logo}
          className="absolute h-full w-full inset-0 object-fit aspect-auto"
          alt="Diskominfo Kuburaya"
        />
      </span>
    </Link>
  );
};

export default Brand;
