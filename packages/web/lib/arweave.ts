import Arweave from "arweave";
import ArweaveAccount, { ArAccount } from "arweave-account";
import { WarpFactory } from "warp-contracts";

export const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

export const arweaveLocal = Arweave.init({
  host: "localhost",
  port: 1984,
  protocol: "http",
});

export const warp = WarpFactory.forMainnet();

export const account = new ArweaveAccount();

export const getAccount = async (address: string) => {
  try {
    const acc: ArAccount = await account.get(address);
    if (acc) {
      return acc;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAccountHandle = async (handle: string) => {
  return await account.search(handle);
};
