import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function H2({ children }: Props) {
  return (
    <h3 className="lg:text-5xl md:text-3xl sm:text-2xl font-bold">
      {children}
    </h3>
  );
}
