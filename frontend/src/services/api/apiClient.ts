import { env } from '@/config/env';
import { ServiceResultStatus, failure, ok } from '@/services/api/serviceResult';
import type { ServiceResult } from '@/services/api/serviceResult';

interface ApiErrorBody {
  error_code?: string;
  message?: string;
}

const statusFromHttpCode = (httpStatus: number): ServiceResultStatus => {
  if (httpStatus === 429) return ServiceResultStatus.RATE_LIMITED;
  if (httpStatus >= 400 && httpStatus < 500) return ServiceResultStatus.BAD_REQUEST;
  return ServiceResultStatus.SERVICE_EXCEPTION;
};

/**
 * Minimal HTTP client for the portfolio API. Every network call in the
 * app goes through here so error handling and base-URL resolution stay
 * in one place.
 */
class ApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(path: string): Promise<ServiceResult<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        headers: { Accept: 'application/json' },
      });
      return await this.toResult<T>(response);
    } catch {
      return failure<T>('Could not reach the server. Please check your connection.');
    }
  }

  async post<T>(path: string, body: unknown): Promise<ServiceResult<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
      });
      return await this.toResult<T>(response);
    } catch {
      return failure<T>('Could not reach the server. Please check your connection.');
    }
  }

  private async toResult<T>(response: Response): Promise<ServiceResult<T>> {
    if (response.ok) {
      const data = (await response.json()) as T;
      return ok(data);
    }

    let message = `Request failed with status ${response.status}`;
    try {
      const body = (await response.json()) as ApiErrorBody;
      message = body.message ?? message;
    } catch {
      // Response had no JSON body — keep the generic message.
    }
    return failure<T>(message, statusFromHttpCode(response.status));
  }
}

export const apiClient = new ApiClient(env.apiBaseUrl);
