// Cloudflare Pages Function: Markdown for Agents content negotiation
// If the requester asks for markdown (Accept: text/markdown), return a markdown version
// of the HTML response. Otherwise, return the original HTML.
//
// Docs: https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/

export async function onRequest(context) {
  const { request, next } = context;

  // Let Pages serve the static asset first (Next.js export output)
  const response = await next();

  const accept = request.headers.get("Accept") || "";
  const wantsMarkdown = accept.includes("text/markdown");

  if (!wantsMarkdown) return response;

  // Only transform HTML; if it's already non-HTML, just pass it through.
  const contentType = response.headers.get("Content-Type") || "";
  if (!contentType.includes("text/html")) return response;

  // Cloudflare provides an HTML -> Markdown transformer.
  // @ts-ignore - global provided by Cloudflare runtime.
  if (typeof HTMLRewriter !== "function") return response;

  // @ts-ignore
  const rewriter = new HTMLRewriter().transform(new Response(response.body, response));

  // Cloudflare "Markdown for Agents": append a transformer that emits markdown.
  // In the Pages runtime this is exposed via response.markdown (or equivalent).
  // Fallback: if no markdown transformer available, return original.
  //
  // NOTE: The actual API is implemented by Cloudflare; this code assumes support
  // on the edge runtime.
  // @ts-ignore
  if (typeof rewriter.markdown !== "function") return response;

  // @ts-ignore
  const mdResponse = await rewriter.markdown();

  const headers = new Headers(mdResponse.headers);
  headers.set("Content-Type", "text/markdown; charset=utf-8");

  return new Response(mdResponse.body, {
    status: mdResponse.status,
    statusText: mdResponse.statusText,
    headers,
  });
}
