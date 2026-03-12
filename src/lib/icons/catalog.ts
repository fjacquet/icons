import * as Fa6 from 'react-icons/fa6';
import * as Md from 'react-icons/md';
import * as Fi from 'react-icons/fi';
import * as Bs from 'react-icons/bs';
import * as Lu from 'react-icons/lu';
import * as Ri from 'react-icons/ri';
import * as Vsc from 'react-icons/vsc';
import * as Si from 'react-icons/si';
import * as Tb from 'react-icons/tb';
import * as Hi2 from 'react-icons/hi2';
import * as Gr from 'react-icons/gr';
import * as Bi from 'react-icons/bi';
import * as Pi from 'react-icons/pi';
import * as AwsIcons from 'aws-react-icons';
import * as AzureIcons from '@threeveloper/azure-react-icons';

import type { IconComponent, IconEntry, IconLibraryId } from '../../types/icons';

export const LIBRARY_LABELS: Record<IconLibraryId, string> = {
  fa6: 'Font Awesome 6',
  md: 'Material Design',
  fi: 'Feather',
  bs: 'Bootstrap',
  lu: 'Lucide',
  ri: 'Remix',
  vsc: 'VS Code',
  si: 'Simple Icons',
  tb: 'Tabler',
  hi2: 'Heroicons',
  gr: 'Grommet',
  bi: 'Bootstrap Icons',
  pi: 'Phosphor',
  awsi: 'AWS Icons',
  azurei: 'Azure Icons',
};

const libraryModules: Record<IconLibraryId, Record<string, unknown>> = {
  fa6: Fa6 as Record<string, unknown>,
  md: Md as Record<string, unknown>,
  fi: Fi as Record<string, unknown>,
  bs: Bs as Record<string, unknown>,
  lu: Lu as Record<string, unknown>,
  ri: Ri as Record<string, unknown>,
  vsc: Vsc as Record<string, unknown>,
  si: Si as Record<string, unknown>,
  tb: Tb as Record<string, unknown>,
  hi2: Hi2 as Record<string, unknown>,
  gr: Gr as Record<string, unknown>,
  bi: Bi as Record<string, unknown>,
  pi: Pi as Record<string, unknown>,
  awsi: AwsIcons as Record<string, unknown>,
  azurei: AzureIcons as Record<string, unknown>,
};

export const ICON_CATALOG: IconEntry[] = (
  Object.entries(libraryModules) as [IconLibraryId, Record<string, unknown>][]
).flatMap(([libId, module]) =>
  Object.keys(module)
    .filter((key) => key !== 'default' && /^[A-Z]/.test(key))
    .map((name) => ({
      name,
      libraryId: libId,
      libraryLabel: LIBRARY_LABELS[libId],
    }))
);

export const AVAILABLE_LIBRARIES: IconLibraryId[] = Object.keys(LIBRARY_LABELS) as IconLibraryId[];

export function entryKey(entry: IconEntry): string {
  return `${entry.libraryId}:${entry.name}`;
}

export function resolveIconComponent(entry: IconEntry): IconComponent | null {
  const module = libraryModules[entry.libraryId];
  const comp = module?.[entry.name];
  return typeof comp === 'function' ? (comp as IconComponent) : null;
}
