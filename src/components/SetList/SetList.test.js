import React from 'react';
import { render, screen } from '@testing-library/react';
import SetList from './SetList';

describe('SetList', () => {
  const mockSets = [
    { id: 1, name: 'Set 1', description: 'Desc 1', flashcards: [] },
    { id: 2, name: 'Set 2', description: 'Desc 2', flashcards: [] },
  ];
  const mockEditSet = jest.fn();
  const mockDeleteSet = jest.fn();
  const mockSelectSet = jest.fn();

  it('renders a list of SetListItem components', () => {
    render(
      <SetList
        sets={mockSets}
        editSet={mockEditSet}
        deleteSet={mockDeleteSet}
        selectSet={mockSelectSet}
      />
    );
    expect(screen.getByText('Set 1')).toBeInTheDocument();
    expect(screen.getByText('Desc 1')).toBeInTheDocument();
    expect(screen.getByText('Set 2')).toBeInTheDocument();
    expect(screen.getByText('Desc 2')).toBeInTheDocument();
  });
});
