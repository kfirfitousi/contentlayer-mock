import type { Document, Properties } from "./types";

/**
 * Generates a dummy MDX document with the given properties, matching the given type.
 * @param properties - The properties to set on the dummy document.
 * Fields that are required in the document type must be provided.
 * @example
 * import { type Post } from 'contentlayer/generated';
 *
 * const post = dummy<Post>({
 *   title: 'Example Post',
 *   date: '2023-01-01',
 *   slug: 'example-post',
 *   _id: 'example-post',
 *  _raw: {
 *    flattenedPath: 'posts/example-post',
 *   },
 * });
 */
export function dummy<D extends Document>(properties: Properties<D>) {
  return {
    ...properties,
    _id: properties._id || "dummy",
    _raw: {
      contentType: "mdx",
      flattenedPath: "posts/dummy",
      sourceFileDir: "posts",
      sourceFileName: "dummy-post.mdx",
      sourceFilePath: "posts/dummy-post.mdx",
      ...properties._raw,
    },
    body: {
      code: "",
      raw: "dummy document raw content",
    },
    type: properties.type || "Post",
  } as D;
}

/**
 * Generates an array of dummy MDX documents with the given properties, matching the given type.
 * @param length - The number of dummy documents to generate.
 * @param properties - The properties to set on the dummy documents.
 * Fields that are required in the document type must be provided.
 * Can be a function that returns the properties for each document.
 * @example
 * import { type Post } from 'contentlayer/generated';
 *
 * const posts = dummyArray<Post>(10, (index) => ({
 *   title: `Post ${index + 1}`,
 *   date: '2022-01-01',
 *   _id: `post-${index + 1}`,
 *   body: {
 *    raw: `Post ${index + 1} raw content`,
 *   },
 * }));
 */
export function dummyArray<D extends Document>(
  length: number,
  properties: Properties<D> | ((index: number) => Properties<D>)
) {
  return Array.from({ length }, (_, index) => {
    return dummy(
      typeof properties === "function" ? properties(index) : properties
    );
  });
}
