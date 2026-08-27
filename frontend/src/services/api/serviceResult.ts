export enum ServiceResultStatus {
  OK = 'OK',
  BAD_REQUEST = 'BAD_REQUEST',
  RATE_LIMITED = 'RATE_LIMITED',
  SERVICE_EXCEPTION = 'SERVICE_EXCEPTION',
}

export interface ServiceResult<T> {
  data: T | null;
  message: string;
  status: ServiceResultStatus;
}

export const ok = <T>(data: T, message = 'OK'): ServiceResult<T> => ({
  data,
  message,
  status: ServiceResultStatus.OK,
});

export const failure = <T>(
  message = 'Something went wrong. Please try again.',
  status: ServiceResultStatus = ServiceResultStatus.SERVICE_EXCEPTION,
): ServiceResult<T> => ({ data: null, message, status });
