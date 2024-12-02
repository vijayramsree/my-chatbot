import { render, screen } from '@testing-library/react';
import UploadPage from '../page';
import { useLoading } from '@/app/providers/LoadingProvider';
import { uploadFile } from '@/app/lib/api';
import { useDropzone } from 'react-dropzone';

jest.mock('@/app/providers/LoadingProvider', () => ({
    useLoading: jest.fn(),
  }));
  
  jest.mock('@/app/lib/api', () => ({
    uploadFile: jest.fn(),
  }));
  
  // Mocking react-dropzone hook
  jest.mock('react-dropzone', () => ({
    useDropzone: jest.fn(),
  }));
  
  describe('UploadPage', () => {
    let setIsLoadingMock;
    let getRootPropsMock;
    let getInputPropsMock;
  
    beforeEach(() => {
      setIsLoadingMock = jest.fn();
      (useLoading as jest.Mock).mockReturnValue(setIsLoadingMock);
  
      // Mocking useDropzone
      getRootPropsMock = jest.fn().mockReturnValue({});
      getInputPropsMock = jest.fn().mockReturnValue({});
      (useDropzone as jest.Mock).mockReturnValue({
        getRootProps: getRootPropsMock,
        getInputProps: getInputPropsMock,
      });
  
      // Mocking uploadFile API
      (uploadFile as jest.Mock).mockImplementation(() => 
        Promise.resolve({
          ok: true,
          json: jest.fn().mockResolvedValue({ message: 'File Uploaded' }),
        })
      );
    });
  
    it('renders without errors', () => {
      render(<UploadPage />);
      expect(screen.getByTestId(/NM/i)).toBeInTheDocument();
      expect(screen.getByText(/Drag and drop a file, or click here to browse/i)).toBeInTheDocument();
    });
  });