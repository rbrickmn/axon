import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SetForm from './SetForm';

describe('SetForm', () => {
  const mockAddSet = jest.fn();

  beforeEach(() => {
    mockAddSet.mockClear();
  });

  it('submits the form with name and description', () => {
    render(<SetForm addSet={mockAddSet} />);
    const nameInput = screen.getByPlaceholderText('Set Name');
    const descriptionInput = screen.getByPlaceholderText('Description (optional)');
    const addButton = screen.getByText('Add Set');

    fireEvent.change(nameInput, { target: { value: 'New Set' } });
    fireEvent.change(descriptionInput, { target: { value: 'New Description' } });
    fireEvent.click(addButton);

    expect(mockAddSet).toHaveBeenCalledWith('New Set', 'New Description');
    expect(nameInput.value).toBe('');
    expect(descriptionInput.value).toBe('');
  });

  it('shows an alert if name is empty', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<SetForm addSet={mockAddSet} />);
    const addButton = screen.getByText('Add Set');

    fireEvent.click(addButton);

    expect(alertMock).toHaveBeenCalledWith('Set name cannot be empty.');
    expect(mockAddSet).not.toHaveBeenCalled();
    alertMock.mockRestore();
  });
});
