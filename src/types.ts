import type { DocumentMeta, MDX } from "contentlayer/dist/core";

export interface MdxDocument extends DocumentMeta {
  [key: string]: any;
  body: MDX;
  type: string;
}

export type Fields<D extends MdxDocument> = Omit<
  D,
  "_id" | "_raw" | "body" | "type"
>;

export type DeepPartial<T> = T extends Record<string, unknown>
  ? Partial<{ [P in keyof T]: DeepPartial<T[P]> }>
  : T;
