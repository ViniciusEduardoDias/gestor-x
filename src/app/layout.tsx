import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tarefas App",
  description: "Gerando aplicação de controle de tarefas com Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-Br">
      <body>{children}</body>
    </html>
  );
}
