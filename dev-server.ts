Bun.serve({
  port: 3077,
  async fetch(req) {
    const url = new URL(req.url)

    // TODO generate a grid of every symbol organized alphabetically
    // return new Response(await Bun.file(url.pathname))
  },
})
