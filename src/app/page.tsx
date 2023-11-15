// import Link from "next/link";

import App from "./_components/app";

export default function Home() {
  // const hello = await api.post.hello.query({ text: "from tRPC" });
  // const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-background p-24 text-foreground dark">
      <h1 className="pb-6 text-center text-4xl font-bold">Ping Status</h1>

      {/* <PingTable /> */}
      <App />
    </main>
  );
}
