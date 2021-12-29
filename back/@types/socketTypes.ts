interface ServerToClientEvents {
  //   noArg: () => void;
  //   basicEmit: (a: number, b: string, c: Buffer) => void;
  //   withAck: (d: string, callback: (e: number) => void) => void;
  message: (message: { name: string; message: string }) => void;
  usersLogin: (usersArr: string[]) => void;
}

interface ClientToServerEvents {
  message: (message: { name: string; message: string }) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

export { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData };
