import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('renders the text input and submit button', () => {
    render(<SearchBar onSearch={jest.fn()} />);
    expect(screen.getByPlaceholderText('Buscar usuário no GitHub...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Buscar' })).toBeInTheDocument();
  });

  it('calls onSearch with trimmed value when form is submitted', async () => {
    const user = userEvent.setup();
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} />);
    await user.type(screen.getByRole('textbox'), '  torvalds  ');
    await user.click(screen.getByRole('button', { name: 'Buscar' }));
    expect(onSearch).toHaveBeenCalledWith('torvalds');
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('calls onSearch when Enter key is pressed', async () => {
    const user = userEvent.setup();
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} />);
    await user.type(screen.getByRole('textbox'), 'torvalds{Enter}');
    expect(onSearch).toHaveBeenCalledWith('torvalds');
  });

  it('disables the button and does not call onSearch when input is empty', async () => {
    const user = userEvent.setup();
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} />);
    const button = screen.getByRole('button', { name: 'Buscar' });
    expect(button).toBeDisabled();
    await user.click(button);
    expect(onSearch).not.toHaveBeenCalled();
  });

  it('pre-populates the input from initialValue', () => {
    render(<SearchBar initialValue="torvalds" onSearch={jest.fn()} />);
    expect(screen.getByDisplayValue('torvalds')).toBeInTheDocument();
  });

  it('enables the button when initialValue is provided', () => {
    render(<SearchBar initialValue="torvalds" onSearch={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'Buscar' })).not.toBeDisabled();
  });
});
