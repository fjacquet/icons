import { createAndDownloadZip } from './zip';

describe('createAndDownloadZip', () => {
  let createObjectURL: jest.Mock;
  let revokeObjectURL: jest.Mock;
  let clickMock: jest.Mock;
  let originalCreateElement: typeof document.createElement;

  beforeEach(() => {
    originalCreateElement = document.createElement.bind(document);
    createObjectURL = jest.fn().mockReturnValue('blob:mock-zip');
    revokeObjectURL = jest.fn();
    clickMock = jest.fn();

    global.URL.createObjectURL = createObjectURL;
    global.URL.revokeObjectURL = revokeObjectURL;

    jest.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      const el = originalCreateElement(tag);
      if (tag === 'a') (el as HTMLAnchorElement).click = clickMock;
      return el;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('creates a Blob and triggers download', () => {
    createAndDownloadZip('icons.zip', [
      { filename: 'a.svg', svgContent: '<svg></svg>' },
      { filename: 'b.svg', svgContent: '<svg><path/></svg>' },
    ]);
    expect(createObjectURL).toHaveBeenCalledTimes(1);
    expect(clickMock).toHaveBeenCalledTimes(1);
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:mock-zip');
  });

  it('produces a non-empty Blob', () => {
    let capturedBlob: Blob | null = null;
    createObjectURL.mockImplementation((b: Blob) => {
      capturedBlob = b;
      return 'blob:test';
    });

    createAndDownloadZip('out.zip', [{ filename: 'icon.svg', svgContent: '<svg/>' }]);
    expect(capturedBlob).not.toBeNull();
    expect(capturedBlob!.size).toBeGreaterThan(0);
  });
});
