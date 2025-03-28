import type { ControlType } from '@/editor/controls/type';
import BooleanControl from './BooleanControl';
import CascaderControl from './CascaderControl';
import CheckControl from './CheckControl';
import CheckGroupControl from './CheckGroupControl';
import CodeEditorControl from './CodeEditorControl';
import ColorControl from './ColorControl';
import ConditionControl from './ConditionControl';
import DateControl from './DateControl';
import EmojiControl from './EmojiControl';
import IconControl from './IconControl';
import ImageControl from './ImageControl';
import InputControl from './InputControl';
import InputOTPControl from './InputOTPControl';
import NumberControl from './NumberControl';
import OptionsControl from './OptionsControl';
import RadioControl from './RadioControl';
import RichInputControl from './RichInputControl';
import RichTextControl from './RichTextControl';
import SegmentedControl from './SegmentedControl';
import SelectControl from './SelectControl';
import SizeControl from './SizeControl';
import SwitchControl from './SwitchControl';
import TextAreaControl from './TextAreaControl';
import TimeControl from './TimeControl';
import TreeOptionsControl from './TreeOptionsControl';
import ValidationControl from './ValidationControl';
import WidgetControl from './WidgetControl';

const propertyControls: ControlType<any>[] = [
  {
    name: 'input',
    control: InputControl,
  },
  {
    name: 'input-otp',
    control: InputOTPControl,
  },
  {
    name: 'size',
    control: SizeControl,
  },
  {
    name: 'radio',
    control: RadioControl,
  },
  {
    name: 'color',
    control: ColorControl,
  },
  {
    name: 'check',
    control: CheckControl,
  },
  {
    name: 'check-group',
    control: CheckGroupControl,
  },
  {
    name: 'icon',
    control: IconControl,
  },
  {
    name: 'switch',
    control: SwitchControl,
  },
  {
    name: 'date',
    control: DateControl,
  },
  {
    name: 'time',
    control: TimeControl,
  },
  {
    name: 'textarea',
    control: TextAreaControl,
  },
  {
    name: 'select',
    control: SelectControl,
  },
  {
    name: 'rich-text',
    control: RichTextControl,
  },
  {
    name: 'rich-input',
    control: RichInputControl,
  },
  {
    name: 'validation',
    control: ValidationControl,
  },
  {
    name: 'boolean',
    control: BooleanControl,
  },
  {
    name: 'number',
    control: NumberControl,
  },
  {
    name: 'options',
    control: OptionsControl,
  },
  {
    name: 'tree-options',
    control: TreeOptionsControl,
  },
  {
    name: 'widget',
    control: WidgetControl,
  },
  {
    name: 'image',
    control: ImageControl,
  },
  {
    name: 'emoji',
    control: EmojiControl,
  },
  {
    name: 'segmented',
    control: SegmentedControl,
  },
  {
    name: 'cascader',
    control: CascaderControl,
  },
  {
    name: 'condition',
    control: ConditionControl,
  },
  {
    name: 'code-editor',
    control: CodeEditorControl,
  },
];

export default propertyControls;
