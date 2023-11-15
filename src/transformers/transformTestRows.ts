import { CoordinatorClientMsg, PingTest } from "../..";

export function transformTestRows(
  msg: CoordinatorClientMsg,
  prevData: PingTest[] = [],
): PingTest[] {
  // do granular update
  if ("test" in msg) {
    return prevData.reduce<PingTest[]>(
      (prev, curr) => [...prev, curr.id === msg.test.id ? msg.test : curr],
      [],
    );
  }

  return msg.tests;
}
