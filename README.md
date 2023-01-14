# contentlayer-mock

Generate typed mocks for [Contentlayer](https://github.com/contentlayerdev/contentlayer) documents.

![npm version](https://img.shields.io/npm/v/contentlayer-mock?style=flat-square)
![size](https://img.shields.io/bundlephobia/min/contentlayer-mock?style=flat-square)

## Usage

### Generate a mocked document

`dummy` generates a single mocked document. The argument `properties` must contain all required fields of the document type.

```ts
import { type Post } from "contentlayer/generated";
import { dummy } from "contentlayer-mock";

const dummyPost = dummy<Post>({
  title: "Dummy Post",
  description: "This is a dummy post",
});

// equivalent to

const dummyPost: Post = {
  _id: "dummy",
  _raw: {
    contentType: "mdx",
    flattenedPath: "posts/dummy",
    sourceFileDir: "posts",
    sourceFileName: "dummy-post.mdx",
    sourceFilePath: "posts/dummy-post.mdx",
  },
  body: {
    code: "",
    raw: "dummy document raw content",
  },
  type: "Post",
  title: "Dummy Post",
  description: "This is a dummy post",
};
```

`properties` can also be used to overwrite the default properties of the document.

```ts
const dummyPost = dummy<Post>({
  title: "Dummy Post",
  description: "This is a dummy post",
  _id: "custom-id",
  body: {
    raw: "custom raw content",
  },
});

dummyPost._id; // "custom-id"
dummyPost.body.raw; // "custom raw content"
```

### Generate an array of mocked documents

`dummyArray` generates an array of mocked documents. The first argument, `length`, is the number of documents to generate. The second argument, `properties`, must contain all required fields of the document type.

```ts
import { type Post } from "contentlayer/generated";
import { dummyArray } from "contentlayer-mock";

const dummyPosts = dummyArray<Post>(10, {
  title: "Dummy Post",
  description: "This is a dummy post",
});
```

`properties` can also be used to overwrite the default properties of the documents.

```ts
const dummyPosts = dummyArray<Post>(10, {
  title: "Dummy Post",
  description: "This is a dummy post",
  _id: "custom-id",
  _raw: {
    flattenedPath: "posts/custom-id",
  },
});
```

You can also pass a function to `properties` to generate different values for each document.

```ts
const dummyPosts = dummyArray<Post>(10, (index) => ({
  title: `Dummy Post ${index}`,
  description: `This is a dummy post ${index}`,
  _id: `custom-id-${index}`,
}));
```

## Limitations

Currently only supports `mdx` documents.
