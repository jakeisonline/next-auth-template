import nextra from "nextra"

const withNextra = nextra({
  contentDirBasePath: "/docs",
  mdxOptions: {
    rehypePrettyCodeOptions: {
      theme: {
        dark: "plastic",
        light: "plastic",
      },
    },
  },
})

// You can include other Next.js configuration options here, in addition to Nextra settings:
export default withNextra({
  // ... Other Next.js config options
})
