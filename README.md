# contentlayer-mock

Generate typed mocks for Contentlayer documents.

[![npm version](https://badge.fury.io/js/contentlayer-mock.svg)](https://badge.fury.io/js/contentlayer-mock)

## Usage

### Generate a mocked document

`dummy` generates a single mocked document. The first argument, `fields`, must contain all required fields of the document type.

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

The second argument, `properties`, is optional and can be used to overwrite the default properties of the document.

```ts
const dummyPost = dummy<Post>(
  {
    title: "Dummy Post",
    description: "This is a dummy post",
  },
  {
    _id: "custom-id",
    body: {
      raw: "custom raw content",
    },
  }
);

dummyPost._id; // "custom-id"
dummyPost.body.raw; // "custom raw content"
```

### Generate an array of mocked documents

`dummies` generates an array of mocked documents. The first argument, `length`, is the number of documents to generate. The second argument, `fields`, must contain all required fields of the document type.

```ts
import { type Post } from "contentlayer/generated";
import { dummies } from "contentlayer-mock";

const dummyPosts = dummies<Post>(10, {
  title: "Dummy Post",
  description: "This is a dummy post",
});
```

You can also pass a function to `fields` to generate different values for each document.

```ts
const dummyPosts = dummies<Post>(10, (index) => ({
  title: `Dummy Post ${index}`,
  description: `This is a dummy post ${index}`,
}));
```

The third argument, `properties`, is optional and can be used to overwrite the default properties of the documents.

```ts
const dummyPosts = dummies<Post>(
  10,
  {
    title: "Dummy Post",
    description: "This is a dummy post",
  },
  {
    _id: "custom-id",
    _raw: {
      flattenedPath: "posts/custom-id",
    },
  }
);
```

You can also pass a function to `properties` to generate different values for each document.

```ts
const dummyPosts = dummies<Post>(
  10,
  {
    title: "Dummy Post",
    description: "This is a dummy post",
  },
  (index) => ({
    _id: `custom-id-${index}`,
  })
);
```
