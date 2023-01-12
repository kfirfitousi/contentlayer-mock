import type { MDX } from "contentlayer/dist/core";
import type { RawDocumentData } from "contentlayer/dist/source-files";
import type { PartialDeep } from "type-fest";

type DocumentMeta = {
  _id: string;
  _raw: RawDocumentData;
};

export type Document = DocumentMeta & {
  body: MDX;
  type: string;
};

type Fields<D extends Document> = Omit<D, keyof DocumentMeta | "body" | "type">;

export type Properties<D extends Document> = Fields<D> & PartialDeep<Document>;
