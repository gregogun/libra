import fs from "fs";
import { WarpFactory } from 'warp-contracts'

const warp = WarpFactory.forMainnet();

const jwk = await warp.arweave.wallets.generate();
const walletAddress = await warp.arweave.wallets.jwkToAddress(jwk)

console.log(JSON.stringify(jwk));
console.log(walletAddress);

const contractSrc = fs.readFileSync("./dist/contract.js", "utf-8");


const { contractTxId } = await warp.deploy({
  wallet: jwk,
  initState: JSON.stringify({
    owner: walletAddress,
    ticker: "BOOKMARK-TEST",
    name: "Bookmark test",
    bookmarks: [],
    balances: {
      xHG2LMGRHAnBgll2Kix11d26p1qBQegfbS30GTKtwSQ: 100000,
    },
    invocations: [],
    emergencyHaltWallet: walletAddress,
    halted: false,
    pairs: [],
    usedTransfers: [],
    foreignCalls: [],
    canEvolve: true,
    claims: [],
    claimable: [],
    settings: [["isTradeable", true]],
  }),
  src: contractSrc,
});

console.log("Contract deployed: " + contractTxId);
