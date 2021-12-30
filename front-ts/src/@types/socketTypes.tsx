export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  message: (data: { name: string; message: string }) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  message: (data: { name: string; message: string }) => void;
}

// export { ServerToClientEvents, ClientToServerEvents };
