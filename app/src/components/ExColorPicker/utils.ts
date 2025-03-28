import { presetPalettes } from '@ant-design/colors';
import { generate } from '@ant-design/colors';
import type { ColorPickerProps } from 'antd';
import { entries } from 'lodash-es';

export type Presets = Required<ColorPickerProps>['presets'][number];

export const genPresets = (presets = presetPalettes) =>
  entries(presets).map<Presets>(([label, colors]) => ({
    label,
    colors: colors.map((item) => generate(item).reverse().slice(2, 8)).flat(),
  }));
