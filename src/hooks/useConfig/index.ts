import { useState, useId, useMemo, useCallback, useRef } from 'react';

type CssUnits =
  | 'cm'
  | 'mm'
  | 'in'
  | 'px'
  | 'pt'
  | 'pc'
  | 'em'
  | 'rem'
  | 'ex'
  | '%'
  | 'vh'
  | 'vw'
  | 'vmin'
  | 'vmax'
  | 'ch';

export type InputPropTypes = {
  id: string;
  type: string;
  name: string;
  label: string;
  onChange(ev: React.ChangeEvent<HTMLInputElement>): void;
};

export type Configs = {
  language: string;
  bgColor: string;
  headingColor: string;
  paragraphColor: string;
  htmlFontSize: string;
  lineSpacing: string;
  wordSpacing: string;
};

export type OnConfigChange = ({
  target,
}: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;

const languages = [{ id: 'eng', text: 'English', value: 'eng' }] as const;

const setCssRootProperty = (key: string, value: string) => {
  document.documentElement.style.setProperty(key, value);
};

const getCssRootProperty = (key: string, fallbackValue: string = '') => {
  return (
    getComputedStyle(document.documentElement).getPropertyValue(key) ||
    fallbackValue
  );
};

const changeFontSize = (value: string, unit: CssUnits = 'px') =>
  setCssRootProperty('--react-a11y-config-font-size', value.concat(unit));
const changeLineSpacing = (value: string) =>
  setCssRootProperty('--react-a11y-config-line-spacing', value);
const changeWordSpacing = (value: string) =>
  setCssRootProperty('--react-a11y-config-word-spacing', value);
const changeBackgroundColor = (value: string) =>
  setCssRootProperty('--react-a11y-config-background-color', value);
const changeHeadingColor = (value: string) =>
  setCssRootProperty('--react-a11y-config-heading-color', value);
const changeParagraphColor = (value: string) =>
  setCssRootProperty('--react-a11y-config-paragraph-color', value);

type CachedStyles = {
  'font-size': string;
  'line-spacing': string;
  'word-spacing': string;
  'background-color': string;
  'heading-color': string;
  'paragraph-color': string;
};

const DEFAULT_CONFIGS: Configs = {
  language: 'en',
  bgColor: getCssRootProperty(
    '--react-a11y-config-background-color',
    '#ff0000'
  ),
  headingColor: getCssRootProperty(
    '--react-a11y-config-heading-color',
    '#ff0000'
  ),
  paragraphColor: getCssRootProperty(
    '--react-a11y-config-paragraph-color',
    '#ffffff'
  ),
  htmlFontSize: getCssRootProperty('--react-a11y-config-font-size', '16'),
  lineSpacing: getCssRootProperty('--react-a11y-config-line-spacing', '1.2'),
  wordSpacing: getCssRootProperty('--react-a11y-config-word-spacing', '5'),
};

function useConfig() {
  const bgInputId = useId();
  const headingInputId = useId();
  const paragraphInputId = useId();
  const fontSizeInputId = useId();
  const lineSpacingInputId = useId();
  const wordSpacingInputId = useId();
  const [configs, setConfigs] = useState(DEFAULT_CONFIGS);
  const cachedStyles = useRef<CachedStyles>({
    'font-size': getCssRootProperty('--react-a11y-config-font-size', '16'),
    'line-spacing': getCssRootProperty(
      '--react-a11y-config-line-spacing',
      '1.2'
    ),
    'word-spacing': getCssRootProperty('--react-a11y-config-word-spacing', '5'),
    'background-color': getCssRootProperty(
      '--react-a11y-config-background-color',
      '#ff0000'
    ),
    'heading-color': getCssRootProperty(
      '--react-a11y-config-heading-color',
      '#ff0000'
    ),
    'paragraph-color': getCssRootProperty(
      '--react-a11y-config-paragraph-color',
      '#ffffff'
    ),
  }).current;

  const input = useMemo(
    () => ({
      colors: [
        {
          id: bgInputId,
          type: 'color',
          name: 'bgColor',
          label: 'Change backgrounds',
          onChange: (ev: React.ChangeEvent<HTMLInputElement>) =>
            changeBackgroundColor(ev.target.value),
        },
        {
          id: headingInputId,
          type: 'color',
          name: 'headingColor',
          label: 'Change Headings',
          onChange: (ev: React.ChangeEvent<HTMLInputElement>) =>
            changeHeadingColor(ev.target.value),
        },
        {
          id: paragraphInputId,
          type: 'color',
          name: 'paragraphColor',
          label: 'Change Contents',
          onChange: (ev: React.ChangeEvent<HTMLInputElement>) =>
            changeParagraphColor(ev.target.value),
        },
      ],
      fonts: [
        {
          id: fontSizeInputId,
          type: 'number',
          name: 'htmlFontSize',
          label: 'Change Font Size',
          onChange: (ev: React.ChangeEvent<HTMLInputElement>) =>
            changeFontSize(ev.target.value),
        },
        {
          id: lineSpacingInputId,
          type: 'number',
          name: 'lineSpacing',
          label: 'Change Line Spacing',
          onChange: (ev: React.ChangeEvent<HTMLInputElement>) =>
            changeLineSpacing(ev.target.value),
        },
        {
          id: wordSpacingInputId,
          type: 'number',
          name: 'wordSpacing',
          label: 'Change Word Spacing',
          onChange: (ev: React.ChangeEvent<HTMLInputElement>) =>
            changeWordSpacing(ev.target.value),
        },
      ],
    }),
    [
      bgInputId,
      fontSizeInputId,
      headingInputId,
      lineSpacingInputId,
      paragraphInputId,
      wordSpacingInputId,
    ]
  );

  const onConfigChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setConfigs(prevState => ({ ...prevState, [target.name]: target.value }));
    },
    []
  );

  const onReset = useCallback(() => {
    setConfigs(DEFAULT_CONFIGS);
    Object.entries(cachedStyles).forEach(([key, value]) =>
      setCssRootProperty(`--react-a11y-config-${key}`, value)
    );
  }, [cachedStyles]);

  return {
    configs,
    input,
    onConfigChange,
    onReset,
  };
}

export { languages, useConfig };
