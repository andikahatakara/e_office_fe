"use client";
import React from "react";

type RenderIfProps = {
  when?: boolean | string;
  children: React.ReactNode;
};

const RenderIf = ({ when = false, children }: RenderIfProps) => {
  return when ? <>{children}</> : <></>;
};

export default RenderIf;
