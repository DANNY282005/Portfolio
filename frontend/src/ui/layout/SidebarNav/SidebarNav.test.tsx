import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { SidebarNav } from '@/ui/layout/SidebarNav/SidebarNav';

describe('SidebarNav', () => {
  it('renders a button for every navigation destination', () => {
    render(<SidebarNav />);

    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Projects' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Education' })).toBeInTheDocument();
  });

  it('toggles the theme when the theme button is clicked', async () => {
    const user = userEvent.setup();
    render(<SidebarNav />);

    const themeButton = screen.getByRole('button', { name: 'Toggle color theme' });
    const initialTheme = document.documentElement.dataset.theme;

    await user.click(themeButton);

    expect(document.documentElement.dataset.theme).not.toBe(initialTheme);
  });
});
