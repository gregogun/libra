export interface ContractState {
  name: string;
  ticker: string;
  owner: string;
  bookmarks: string[];
  balances: {
    [addr: string]: number;
  };
  invocations: Array<string>;
  emergencyHaltWallet: string;
  halted: false;
  pairs: Array<any>;
  usedTransfers: Array<any>;
  foreignCalls: Array<any>;
  canEvolve?: Boolean;
  evolve?: string;
  claimable: {
    from: string;
    to: string;
    qty: number;
    txID: string;
  }[];
  claims: string[];
  settings: (string | boolean)[][];
}

export interface Balance {
  target: string;
  balance: number;
  ticker: string;
}

export interface ContractAction {
  input: ContractInput;
  caller: string;
}

export interface ContractInput {
  function:
    | "transfer"
    | "balance"
    | "readOutbox"
    | "addPair"
    | "cancelOrder"
    | "createOrder"
    | "halt"
    | "allow"
    | "claim"
    | "evolve"
    | "addBookmark"
    | "removeBookmark";
  target?: string;
  qty?: number;
  contract?: string;
  txID?: string;
  value?: string;
}

export interface ForeignCall {
  txID: string;
  contract: string;
  input: any;
}

export interface AddPair {
  function: "addPair";
  pair: [string, string]; // Pair that the user wants to initialize
}

export interface CreateOrder {
  function: "createOrder";
  transaction: string; // Transaction hash from the token transfer to this contract
  pair: [string, string]; // Pair that user is trading between
  price?: number; // Price of token being sent (optional)
}

export interface CancelOrder {
  function: "cancelOrder";
  orderID: string; // Transaction hash from the order creation contract interaction
}

export interface Halt {
  function: "halt";
}

export interface ReadOutbox {
  function: "readOutbox";
  contract: string;
  id: string;
}
