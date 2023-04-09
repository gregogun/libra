import { arweaveLocal, connect, webWallet } from "./arweave";
import arweaveGql, { Transaction } from "arweave-graphql";
import { addFunds, mineBlock } from "./utils";
import { Bookmark, UploadData } from "@/types";

export const saveTx = async (upload: UploadData) => {
  try {
    const data = await arweaveGql(`${"arweave.net"}/graphql`).getTransactions({
      ids: [upload.targetId],
    });
    const exists = data.transactions.edges.length > 0;
    if (exists) {
      let address;
      if (!upload.address) {
        address = await window.arweaveWallet.getActiveAddress();
      }
      await addFunds(arweaveLocal, upload.address || (address as string));
      await mineBlock(arweaveLocal);

      const savedTx = await arweaveLocal.createTransaction({
        data: `Bookmark: ${upload.targetId}`,
      });
      savedTx.addTag("App-Name", "Permalib");
      savedTx.addTag("Data-Source", upload.targetId);
      savedTx.addTag("Title", upload.name);
      savedTx.addTag("Type", "bookmark");
      savedTx.addTag(
        "Data-Source-Type",
        data.transactions.edges[0].node.data.type || ""
      );

      const savedTxResult = await window.arweaveWallet.dispatch(savedTx);
      console.log("transaction saved successfully", savedTxResult);
    } else {
      throw new Error(
        "Transaction does not exist. Please provide a valid transaction."
      );
    }
  } catch (error) {
    throw new Error(error as unknown as string);
  }
};

export const getBookmarks = async (address: string | undefined) => {
  if (!address) {
    return;
  }
  try {
    const data = await arweaveGql(
      `${"http://localhost:1984"}/graphql`
    ).getTransactions({
      owners: address,
      tags: [
        {
          name: "Type",
          values: ["bookmark"],
        },
      ],
    });

    const res = await data.transactions.edges.map((edge) =>
      transform(edge.node as Transaction)
    );
    console.log(res);

    return Promise.all(res);
  } catch (error) {
    throw new Error(error as unknown as string);
  }
};

const transform = (node: Transaction) => {
  const name = node.tags.find((tag) => tag.name === "Title")?.value;
  const targetId = node.tags.find((tag) => tag.name === "Bookmarks")?.value;

  return {
    name,
    targetId,
  };
};
