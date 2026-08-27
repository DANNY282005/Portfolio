import { env } from '@/config/env';
import { apiClient } from '@/services/api/apiClient';
import type { ServiceResult } from '@/services/api/serviceResult';
import type { PortfolioOverview } from '@/types/portfolio.types';

export const portfolioService = {
  getOverview: (): Promise<ServiceResult<PortfolioOverview>> => apiClient.get<PortfolioOverview>('/api/v1/portfolio'),
};

export const resumeDownloadUrl = (): string => `${env.apiBaseUrl}/api/v1/resume`;
