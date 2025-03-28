import type { ControlType } from '@/editor/controls/type';
import BackgroundControl from './BackgroundControl';
import BorderControl from './BorderControl';
import CornerRadiusControl from './BorderRadiusControl';
import FontColorControl from './FontColorControl';
import FontFamilyControl from './FontFamilyControl';
import FontSizeControl from './FontSizeControl';
import FontStyleControl from './FontStyleControl';
import FontWeightControl from './FontWeightControl';
import HeightControl from './HeightControl';
import MarginControl from './MarginControl';
import PaddingControl from './PaddingControl';
import ShadowControl from './ShadowControl';
import TextAlignControl from './TextAlignControl';
import WidthControl from './WidthControl';

const styleControls: ControlType<any>[] = [
  {
    name: 'background',
    control: BackgroundControl,
  },
  {
    name: 'border',
    control: BorderControl,
  },
  {
    name: 'corner',
    control: CornerRadiusControl,
  },
  {
    name: 'shadow',
    control: ShadowControl,
  },
  {
    name: 'height',
    control: HeightControl,
  },
  {
    name: 'width',
    control: WidthControl,
  },
  {
    name: 'color',
    control: FontColorControl,
  },
  {
    name: 'fontsize',
    control: FontSizeControl,
  },
  {
    name: 'fontweight',
    control: FontWeightControl,
  },
  {
    name: 'fontfamily',
    control: FontFamilyControl,
  },
  {
    name: 'textalign',
    control: TextAlignControl,
  },
  {
    name: 'fontstyle',
    control: FontStyleControl,
  },
  {
    name: 'margin',
    control: MarginControl,
  },
  {
    name: 'padding',
    control: PaddingControl,
  },
];

export default styleControls;
