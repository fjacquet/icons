import { AVAILABLE_LIBRARIES, ICON_CATALOG, resolveIconComponent } from './catalog';

describe('ICON_CATALOG', () => {
  it('is non-empty', () => {
    expect(ICON_CATALOG.length).toBeGreaterThan(0);
  });

  it('all entries have required fields', () => {
    for (const entry of ICON_CATALOG) {
      expect(entry.name).toBeTruthy();
      expect(entry.libraryId).toBeTruthy();
      expect(entry.libraryLabel).toBeTruthy();
    }
  });

  it('all entry names start with an uppercase letter', () => {
    for (const entry of ICON_CATALOG) {
      expect(entry.name[0]).toMatch(/[A-Z]/);
    }
  });
});

describe('AVAILABLE_LIBRARIES', () => {
  it('is non-empty', () => {
    expect(AVAILABLE_LIBRARIES.length).toBeGreaterThan(0);
  });
});

describe('resolveIconComponent', () => {
  it('resolves a known icon', () => {
    const entry = ICON_CATALOG[0];
    const comp = resolveIconComponent(entry);
    expect(comp).not.toBeNull();
  });

  it('returns null for unknown icon name', () => {
    const comp = resolveIconComponent({
      name: '__NotAnIcon__',
      libraryId: 'fa6',
      libraryLabel: 'x',
    });
    expect(comp).toBeNull();
  });
});
