import { ContractState } from "./types";

export const initState: ContractState = {
  owner: "xHG2LMGRHAnBgll2Kix11d26p1qBQegfbS30GTKtwSQ",
  ticker: "BOOKMARK-TEST",
  name: "Bookmark test",
  bookmarks: [],
  balances: {
    xHG2LMGRHAnBgll2Kix11d26p1qBQegfbS30GTKtwSQ: 100000,
  },
  invocations: [],
  emergencyHaltWallet: "xHG2LMGRHAnBgll2Kix11d26p1qBQegfbS30GTKtwSQ",
  halted: false,
  pairs: [],
  usedTransfers: [],
  foreignCalls: [],
  canEvolve: true,
  claims: [],
  claimable: [],
  settings: [["isTradeable", true]],
};
