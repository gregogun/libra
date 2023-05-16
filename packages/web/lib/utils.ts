import Arweave from "arweave";

export async function addFunds(arweave: Arweave, walletAddress: string) {
  await arweave.api.get(`/mint/${walletAddress}/${1e12}`);
}

export async function mineBlock(arweave: Arweave) {
  await arweave.api.get("mine");
}
