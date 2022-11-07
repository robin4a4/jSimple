/**
 * Data fetching
 */
enum RequesterMethods {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Delete = "DELETE",
}
enum RequesterType {
  Json = "JSON",
  Xml = "XML",
}
interface RequesterOptions {
  type: RequesterType;
  method?: RequesterMethods;
  headers: {
    Accept: string;
    "Content-Type": string;
    Authorization: string;
  };
  body?: string;
}
const jsonResponse = (response: Response) => response.json();
const xmlResponse = (response: Response) => response.text();

async function requester(url: string, options?: RequesterOptions) {
  const results: { content: Promise<any> | null; error: Error | null } = {
    content: null,
    error: null,
  }; // TODO: better type

  let resultFunction = jsonResponse;
  if (options?.type === RequesterType.Xml) resultFunction = xmlResponse;

  const response = await fetch(url, { method: "GET", ...options });
  if (response.ok) {
    results.content = await resultFunction(response);
  } else {
    results.error = new Error("server error");
  }
  return results;
}

export function GET(url: string, options: RequesterOptions) {
  return requester(url, { method: RequesterMethods.Get, ...options });
}
export function POST(url: string, options: RequesterOptions) {
  return requester(url, { method: RequesterMethods.Post, ...options });
}
export function PUT(url: string, options: RequesterOptions) {
  return requester(url, { method: RequesterMethods.Put, ...options });
}
export function DELETE(url: string, options: RequesterOptions) {
  return requester(url, { method: RequesterMethods.Delete, ...options });
}
