export type Bookmark = {
  name: string;
  targetId: string;
};

export type UploadData = Bookmark & {
  address: string | undefined;
};

export interface CtxProps {
  title: string;
  description: string;
  address: string;
  assetId?: string;
  atomicId?: string;
}
