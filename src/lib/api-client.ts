import { API_BASE_URL } from "./config";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type RequestOptions = {
    method?: HttpMethod;
    data?: any;
    token?: string | null;
    headers?: Record<string, string>;
    query?: Record<string, string | number | boolean | undefined | null>;
    isFormData?: boolean;
    cache?: RequestCache;
};

function buildQuery(params: RequestOptions["query"]) {
    if (!params) return "";
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") return;
        searchParams.append(key, String(value));
    });
    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : "";
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { method = "GET", data, token, headers, query, isFormData, cache = "no-store" } = options;

    const queryString = buildQuery(query);
    const url = `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}${queryString}`;

    const requestHeaders: HeadersInit = new Headers();

    if (!isFormData) {
        requestHeaders.set("Content-Type", "application/json");
    }

    if (token) {
        requestHeaders.set("Authorization", `Bearer ${token}`);
    }

    if (headers) {
        Object.entries(headers).forEach(([key, value]) => {
            requestHeaders.set(key, value);
        });
    }

    const body: BodyInit | undefined = (() => {
        if (method === "GET" || method === "DELETE") return undefined;
        if (isFormData) return data as FormData;
        if (data === undefined) return undefined;
        return JSON.stringify(data);
    })();

    const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body,
        cache,
    });

    const contentType = response.headers.get("Content-Type");
    const isJson = contentType?.includes("application/json");

    if (!response.ok) {
        const errorMessage = isJson ? await response.json().catch(() => null) : await response.text().catch(() => null);
        const message = errorMessage?.message ?? (typeof errorMessage === "string" ? errorMessage : response.statusText);
        throw new Error(message || "Request failed");
    }

    if (method === "DELETE" || response.status === 204) {
        return undefined as T;
    }

    return (isJson ? await response.json() : await response.text()) as T;
}
