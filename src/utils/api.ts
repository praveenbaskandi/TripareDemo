export interface RetryOptions {
    retries?: number;
    backoff?: number; // Initial backoff in ms
}

export async function fetchWithRetry(
    url: string,
    options: RequestInit = {},
    retryOptions: RetryOptions = {}
): Promise<Response> {
    const { retries = 3, backoff = 1000 } = retryOptions;

    try {
        const response = await fetch(url, options);

        // Treat 5xx server errors as retryable, but 4xx client errors as fatal
        if (!response.ok && response.status >= 500) {
            throw new Error(`Server returned ${response.status}`);
        }

        return response;
    } catch (error) {
        if (retries > 0) {
            console.warn(`Fetch failed for ${url}, retrying in ${backoff}ms... (${retries} attempts left)`);
            await new Promise((resolve) => setTimeout(resolve, backoff));
            return fetchWithRetry(url, options, {
                retries: retries - 1,
                backoff: backoff * 2, // Exponential backoff
            });
        }
        console.error(`Fetch failed for ${url} after all retries:`, error);
        throw error;
    }
}
