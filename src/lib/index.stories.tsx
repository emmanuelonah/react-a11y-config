import React from 'react';

import { StoryFn, Meta } from '@storybook/react';

import { A11yConfig } from './index.lib';

export default {
  title: 'Lib/A11yConfig',
  component: A11yConfig,
} as Meta<typeof A11yConfig>;

export const Primary: StoryFn<typeof A11yConfig> = () => <A11yConfig />;
