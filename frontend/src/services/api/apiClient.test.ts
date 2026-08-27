import { afterEach, describe, expect, it, vi } from 'vitest';

import { apiClient } from '@/services/api/apiClient';
import { ServiceResultStatus } from '@/services/api/serviceResult';

describe('apiClient', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns OK data on a successful response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ hello: 'world' }) }));

    const result = await apiClient.get<{ hello: string }>('/api/v1/example');

    expect(result.status).toBe(ServiceResultStatus.OK);
    expect(result.data).toEqual({ hello: 'world' });
  });

  it('maps a 4xx response to BAD_REQUEST with the server message', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 422,
        json: async () => ({ error_code: 'VALIDATION_ERROR', message: 'Invalid payload' }),
      }),
    );

    const result = await apiClient.get('/api/v1/example');

    expect(result.status).toBe(ServiceResultStatus.BAD_REQUEST);
    expect(result.message).toBe('Invalid payload');
  });

  it('returns a SERVICE_EXCEPTION result when the network call throws', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));

    const result = await apiClient.get('/api/v1/example');

    expect(result.status).toBe(ServiceResultStatus.SERVICE_EXCEPTION);
    expect(result.data).toBeNull();
  });
});
