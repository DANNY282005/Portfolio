import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Badge } from '@/ui/reusables/Badge';

describe('Badge', () => {
  it('renders the given label', () => {
    render(<Badge label="LangGraph" />);
    expect(screen.getByText('LangGraph')).toBeInTheDocument();
  });
});
