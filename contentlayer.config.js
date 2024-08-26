import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

/** @type {import('contentlayer/source-files').ComputedFields}*/

const computedFields = {
  //each field allows access to a resolve function where inside is the doc we can extract a value to return as slug
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    //o have the slug as params
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath.split("/").slice.join("/")}`,
  },
};

export const Doc = defineDocumentType(() => ({
  //this is what is imported later in our page
  name: "Posts",
  filePathPattern: `posts/**/*.mdx`, //the place your markdown lives
  contentType: "mdx",
  fields: {
    //declaration of the metadata of our markdown files to display on our meta
    // generated at build time
    title: {
      type: "string",
      required: true,
    },
    desc: {
      type: "string",
      required: true,
    },
    published: {
      type: "boolean",
      default: true,
    },
  },
  computedFields, //the computed fields to be found
}));

export default makeSource({
  contentDirPath: "src/content", //where you want the markdown file documents to reside
  documentTypes: [Doc], //if you have multiple doc types/ articles/ privacy and terms, they go here
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      //give prettier code and make the headings clickable to enable jumping
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copied and pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHiglightedLine(node) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHiglightedWord(node) {
            node.properties.className.push("word--highlighted");
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["sub-anchor"],
            ariaLabel: 'Link to Section'
          },
        },
      ],
    ],
  },
});
