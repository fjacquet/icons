import { downloadSvg } from './download';

describe('downloadSvg', () => {
  let createObjectURL: jest.Mock;
  let revokeObjectURL: jest.Mock;
  let clickMock: jest.Mock;
  let originalCreateElement: typeof document.createElement;

  beforeEach(() => {
    originalCreateElement = document.createElement.bind(document);
    createObjectURL = jest.fn().mockReturnValue('blob:mock-url');
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

  it('creates a Blob and triggers a click', () => {
    downloadSvg('test.svg', '<svg></svg>');
    expect(createObjectURL).toHaveBeenCalledTimes(1);
    expect(clickMock).toHaveBeenCalledTimes(1);
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
  });

  it('sets the correct filename on the anchor', () => {
    let capturedAnchor: HTMLAnchorElement | null = null;
    jest.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      const el = originalCreateElement(tag);
      if (tag === 'a') {
        (el as HTMLAnchorElement).click = clickMock;
        capturedAnchor = el as HTMLAnchorElement;
      }
      return el;
    });

    downloadSvg('my-icon.svg', '<svg></svg>');
    expect(capturedAnchor!.download).toBe('my-icon.svg');
  });
});
