import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SetListItem from './SetListItem';

describe('SetListItem', () => {
  const mockSet = { id: 1, name: 'Test Set', description: 'Test Description', flashcards: [] };
  const mockEditSet = jest.fn();
  const mockDeleteSet = jest.fn();
  const mockSelectSet = jest.fn();

  it('renders set details and buttons', () => {
    render(
      <SetListItem
        set={mockSet}
        editSet={mockEditSet}
        deleteSet={mockDeleteSet}
        selectSet={mockSelectSet}
      />
    );
    expect(screen.getByText('Test Set')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('View')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('calls selectSet when View button is clicked', () => {
    render(
      <SetListItem
        set={mockSet}
        editSet={mockEditSet}
        deleteSet={mockDeleteSet}
        selectSet={mockSelectSet}
      />
    );
    fireEvent.click(screen.getByText('View'));
    expect(mockSelectSet).toHaveBeenCalledWith(mockSet.id);
  });

  it('calls deleteSet when Delete button is clicked', () => {
    render(
      <SetListItem
        set={mockSet}
        editSet={mockEditSet}
        deleteSet={mockDeleteSet}
        selectSet={mockSelectSet}
      />
    );
    fireEvent.click(screen.getByText('Delete'));
    expect(mockDeleteSet).toHaveBeenCalledWith(mockSet.id);
  });

  it('switches to edit mode when Edit button is clicked', () => {
    render(
      <SetListItem
        set={mockSet}
        editSet={mockEditSet}
        deleteSet={mockDeleteSet}
        selectSet={mockSelectSet}
      />
    );
    fireEvent.click(screen.getByText('Edit'));
    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Set')).toBeInTheDocument();
  });
});
