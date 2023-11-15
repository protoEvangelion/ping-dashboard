"use client";

import { NextUIProvider } from "@nextui-org/react";
import { PingTable } from "./organisms/PingTable";

export default function App() {
  // const hello = await api.post.hello.query({ text: "from tRPC" });
  // const session = await getServerAuthSession();

  return (
    <NextUIProvider className="h-full">
      <PingTable />
    </NextUIProvider>
  );
}
