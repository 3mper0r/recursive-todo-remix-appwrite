import { RemixServer } from "@remix-run/react"
import { renderToString } from "react-dom/server"

export default function handleRequest(
  request: Request,
  statusCode: number,
  headers: Headers,
  context: any
) {
  const html = renderToString(
    <RemixServer context={context} url={request.url} />
  )

  headers.set("Content-Type", "text/html")

  return new Response("<!DOCTYPE html>" + html, {
    status: statusCode,
    headers
  })
}
