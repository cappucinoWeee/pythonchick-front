// src/__tests__/CodeCompiler.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CodeCompiler from '../components/compiler/CodeCompiler';
import axios from 'axios';

// Mock axios
jest.mock('axios');

describe('CodeCompiler Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });
  
  test('renders code editor and buttons', () => {
    render(<CodeCompiler initialCode="# Test code" />);
    
    expect(screen.getByText('Code')).toBeInTheDocument();
    expect(screen.getByText('Output')).toBeInTheDocument();
    expect(screen.getByText('Run Code')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
    
    // Code editor should contain initial code
    const codeEditor = screen.getByRole('textbox');
    expect(codeEditor.value).toBe('# Test code');
  });
  
  test('runs code and displays output', async () => {
    // Mock axios response
    axios.post.mockResolvedValue({
      data: {
        success: true,
        output: 'Hello, World!',
        error: '',
        execution_time: 0.1,
        matches_expected: true
      }
    });
    
    const onSuccessMock = jest.fn();
    
    render(
      <CodeCompiler 
        initialCode="print('Hello, World!')" 
        expectedOutput="Hello, World!"
        onSuccess={onSuccessMock}
      />
    );
    
    // Run the code
    fireEvent.click(screen.getByText('Run Code'));
    
    // Wait for the output to be displayed
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/v1/code/execute', {
        code: "print('Hello, World!')",
        expected_output: "Hello, World!"
      });
      
      // Should switch to output tab
      expect(screen.getByText('Your Output')).toBeInTheDocument();
      expect(screen.getByText('Hello, World!')).toBeInTheDocument();
      
      // Success message should be displayed
      expect(screen.getByText('Success!')).toBeInTheDocument();
      
      // onSuccess callback should be called
      expect(onSuccessMock).toHaveBeenCalledWith("print('Hello, World!')");
    });
  });
  
  test('handles errors properly', async () => {
    // Mock axios response with error
    axios.post.mockResolvedValue({
      data: {
        success: false,
        output: '',
        error: 'SyntaxError: invalid syntax',
        execution_time: 0.05,
        matches_expected: false
      }
    });
    
    render(<CodeCompiler initialCode="print('Hello, World!" />);
    
    // Run the code
    fireEvent.click(screen.getByText('Run Code'));
    
    // Wait for the error to be displayed
    await waitFor(() => {
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText('SyntaxError: invalid syntax')).toBeInTheDocument();
    });
  });
  
  test('resets code to initial state', async () => {
    render(<CodeCompiler initialCode="# Initial code" />);
    
    // Change the code
    const codeEditor = screen.getByRole('textbox');
    fireEvent.change(codeEditor, { target: { value: '# Modified code' } });
    
    // Verify code was changed
    expect(codeEditor.value).toBe('# Modified code');
    
    // Reset the code
    fireEvent.click(screen.getByText('Reset'));
    
    // Verify code was reset
    expect(codeEditor.value).toBe('# Initial code');
  });
});