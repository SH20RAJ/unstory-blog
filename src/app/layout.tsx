import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unstory",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
