import { useEffect, useState } from 'react';

import { portfolioService } from '@/services/portfolioService';
import type { PortfolioOverview } from '@/types/portfolio.types';

interface PortfolioDataState {
  data: PortfolioOverview | null;
  isLoading: boolean;
  error: string | null;
}

export const usePortfolioData = (): PortfolioDataState => {
  const [state, setState] = useState<PortfolioDataState>({ data: null, isLoading: true, error: null });

  useEffect(() => {
    let isMounted = true;

    portfolioService.getOverview().then((result) => {
      if (!isMounted) return;
      if (result.data) {
        setState({ data: result.data, isLoading: false, error: null });
      } else {
        setState({ data: null, isLoading: false, error: result.message });
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
};
