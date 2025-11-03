import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditSetForm from './EditSetForm';

describe('EditSetForm', () => {
  const mockSet = { id: 1, name: 'Original Name', description: 'Original Description' };
  const mockEditSet = jest.fn();
  const mockSetIsEditing = jest.fn();

  beforeEach(() => {
    mockEditSet.mockClear();
    mockSetIsEditing.mockClear();
  });

  it('renders with initial set data', () => {
    render(
      <EditSetForm
        set={mockSet}
        editSet={mockEditSet}
        setIsEditing={mockSetIsEditing}
      />
    );
    expect(screen.getByDisplayValue('Original Name')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Original Description')).toBeInTheDocument();
  });

  it('calls editSet and setIsEditing on form submission', () => {
    render(
      <EditSetForm
        set={mockSet}
        editSet={mockEditSet}
        setIsEditing={mockSetIsEditing}
      />
    );
    const nameInput = screen.getByDisplayValue('Original Name');
    const descriptionInput = screen.getByDisplayValue('Original Description');
    const saveButton = screen.getByText('Save');

    fireEvent.change(nameInput, { target: { value: 'Updated Name' } });
    fireEvent.change(descriptionInput, { target: { value: 'Updated Description' } });
    fireEvent.click(saveButton);

    expect(mockEditSet).toHaveBeenCalledWith(1, 'Updated Name', 'Updated Description');
    expect(mockSetIsEditing).toHaveBeenCalledWith(false);
  });

  it('calls setIsEditing with false when Cancel button is clicked', () => {
    render(
      <EditSetForm
        set={mockSet}
        editSet={mockEditSet}
        setIsEditing={mockSetIsEditing}
      />
    );
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockSetIsEditing).toHaveBeenCalledWith(false);
  });

  it('shows an alert if name is empty on submission', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(
      <EditSetForm
        set={mockSet}
        editSet={mockEditSet}
        setIsEditing={mockSetIsEditing}
      />
    );
    const nameInput = screen.getByDisplayValue('Original Name');
    const saveButton = screen.getByText('Save');

    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.click(saveButton);

    expect(alertMock).toHaveBeenCalledWith('Set name cannot be empty.');
    expect(mockEditSet).not.toHaveBeenCalled();
    alertMock.mockRestore();
  });
});
