import $, { TSignal } from "@jsimple/core";

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
  type?: RequesterType;
  method: RequesterMethods;
  headers?: {
    Accept: string;
    "Content-Type": string;
    Authorization: string;
  };
  body?: URLSearchParams | FormData | Blob | BufferSource;
}

type CRUDOptionType = Omit<RequesterOptions, "method">;

const jsonResponse = (response: Response) => response.json();
const xmlResponse = (response: Response) => response.text();

async function requester<TData>(url: string, options: RequesterOptions) {
  let resultFunction = jsonResponse;
  if (options?.type === RequesterType.Xml) resultFunction = xmlResponse;

  const response = await fetch(url, options);
  return resultFunction(response) as Promise<TData>;
}

export function GET<TData>(
  url: string,
  options?: Omit<CRUDOptionType, "body">
) {
  return requester<TData>(url, { method: RequesterMethods.Get, ...options });
}
export function POST<TData>(url: string, options?: CRUDOptionType) {
  return requester<TData>(url, { method: RequesterMethods.Post, ...options });
}
export function PUT<TData>(url: string, options?: CRUDOptionType) {
  return requester<TData>(url, { method: RequesterMethods.Put, ...options });
}
export function DELETE<TData>(url: string, options?: CRUDOptionType) {
  return requester<TData>(url, { method: RequesterMethods.Delete, ...options });
}

/**
 * Query management (like a super tiny tanstack-query)
 * @param promise
 * @param key
 * @returns
 */
export const load = <TData>(
  promise: Promise<TData>,
  key: Array<string | TSignal<any>>
) => {
  const [data, setData] = $.signal<TData | null>(null);
  const [isLoading, setIsLoading] = $.signal(true);
  const [isError, setIsError] = $.signal(false);
  const [error, setError] = $.signal(null);
  const stringifiedKey = JSON.stringify(key);
  const cachedData = sessionStorage.getItem(stringifiedKey);
  if (!cachedData) {
    promise
      .then((data) => {
        setData(data);
        sessionStorage.setItem(stringifiedKey, JSON.stringify(data));
      })
      .catch((err) => {
        setIsError(true);
        setError(err);
      })
      .finally(() => setIsLoading(false));
  } else {
    setData(JSON.parse(cachedData));
    setIsLoading(false);
  }

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
