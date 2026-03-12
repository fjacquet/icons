import React from 'react';

export type IconLibraryId =
  | 'fa6'
  | 'md'
  | 'fi'
  | 'bs'
  | 'lu'
  | 'ri'
  | 'vsc'
  | 'si'
  | 'tb'
  | 'hi2'
  | 'gr'
  | 'bi'
  | 'pi'
  | 'awsi'
  | 'azurei';

export interface IconEntry {
  name: string;
  libraryId: IconLibraryId;
  libraryLabel: string;
}

export interface IconSettings {
  size: number;
  color: string;
  background: string | null;
}

export interface IconBaseProps extends React.SVGProps<SVGSVGElement> {
  size?: string | number;
  color?: string;
}

export type IconComponent = React.ComponentType<IconBaseProps>;
