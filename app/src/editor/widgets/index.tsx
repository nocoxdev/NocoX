import {
  IconBoxModel2,
  IconClick,
  IconComponents,
  IconForms,
  IconLayout,
  IconMenu,
  IconMessages,
  IconPresentation,
  IconTable,
} from '@tabler/icons-react';
import { t } from 'i18next';
import { PageType, type WidgetGroupConfig } from '@/types';
import ButtonWidget from './ButtonWidget';
import CascaderWidget from './CascaderWidget';
import CheckboxsWidget from './CheckboxGroupWidget';
import CheckboxWidget from './CheckboxWidget';
import ColorWidget from './ColorWidget';
import ConditionWidget from './ConditionWidget';
import ContainerWidget from './ContainerWidget';
import DatePickerWidget from './DatePickerWidget';
import DividerWidget from './DividerWidget';
import FileUploadWidget from './FileUploadWidget';
import FlexWidget from './FlexWidget';
import FormWidget from './FormWidget';
import FieldItemWidget from './FormWidget/DataItemWidget';
import FormItemWidget from './FormWidget/FormItemWidget';
import GridWidget from './GridWidget';
import ColWidget from './GridWidget/ColWidget';
import IconWidget from './IconWidget';
import ImageUploadWidget from './ImageUploadWidget';
import ImageWidget from './ImageWidget';
import InnerContainerWidget from './InnerContainerWidget';
import InputOTPWidget from './InputOTPWidget';
import InputPasswordWidget from './InputPasswordWidget';
import InputSearchWidget from './InputSearchWidget';
import InputWidget from './InputWidget';
import LayoutWidget from './LayoutWidget';
import ContentWidget from './LayoutWidget/ContentWidget';
import FooterWidget from './LayoutWidget/FooterWidget';
import HeaderWidget from './LayoutWidget/HeaderWidget';
import SiderWidget from './LayoutWidget/SiderWidget';
import LinkWidget from './LinkWidget';
import MenuWidget from './MenuWidget';
import MenuDividerWidget from './MenuWidget/MenuDividerWidget';
import MenuGroupWidget from './MenuWidget/MenuItemsGroupWidget';
import MenuItemWidget from './MenuWidget/MenuItemWidget';
import ModalWidget from './ModalWidget';
import NumberWidget from './NumberWidget';
import PageWidget from './PageWidget';
import PaginationWidget from './PaginationWidget';
import PopconfirmWidget from './PopconfirmWidget';
import RadiosWidget from './RadiosWidget';
import RateWidget from './RateWidget';
import RichTextAreaWidget from './RichTextAreaWidget';
import RichTextWidget from './RichTextWidget';
import SelectWidget from './SelectWidget';
import SimpleTextWidget from './SimpleTextWidget';
import SliderWidget from './SliderWidget';
import SpaceWidget from './SpaceWidget';
import SwitchWidget from './SwitchWidget';
import TableWidget from './TableWidget';
import BodyCellDataItemWidget from './TableWidget/BodyCellDataItemWidget';
import BodyCellDataTextWidget from './TableWidget/BodyCellDataTextWidget';
import BodyCellWidget from './TableWidget/BodyCellWidget';
import TableColumnWidget from './TableWidget/ColumnWidget';
import DataFilterWidget from './TableWidget/DataFilterWidget';
import DataSortWidget from './TableWidget/DataSortWidget';
import QueryItemWidget from './TableWidget/QueryItemWidget';
import TableColumnsWidget from './TableWidget/TableColumnsWidget';
import TableToolbarWidget from './TableWidget/ToolbarWidget';
import TabsWidget from './TabsWidget';
import TabPanelWidget from './TabsWidget/TabPanelWidget';
import TagsWidget from './TagsWidget';
import TagWidget from './TagWidget';
import TextareaWidget from './TextareaWidget';
import TimePickerWidget from './TimePickerWidget';
import TooltipWidget from './TooltipWidget';
import TreeSelectWidget from './TreeSelectWidget';

const groups: WidgetGroupConfig[] = [
  {
    name: 'basic',
    icon: IconComponents,
    label: t('Basic'),
    showType: PageType.PAGE,
    widgets: [
      NumberWidget,
      InputWidget,
      InputPasswordWidget,
      InputOTPWidget,
      InputSearchWidget,
      TextareaWidget,
      RichTextAreaWidget,
      RateWidget,
      SwitchWidget,
      CheckboxWidget,
      RadiosWidget,
      CheckboxsWidget,
      SelectWidget,
      TreeSelectWidget,
      DatePickerWidget,
      ColorWidget,
      TimePickerWidget,
      CascaderWidget,
      TagWidget,
      TagsWidget,
      SliderWidget,
      ImageUploadWidget,
      FileUploadWidget,
    ],
  },
  {
    name: 'form',
    icon: IconForms,
    label: t('Form'),
    showType: PageType.PAGE,
    widgets: [FormWidget, FormItemWidget, FieldItemWidget],
  },

  {
    name: 'table',
    icon: IconTable,
    label: t('Table'),
    showType: PageType.PAGE,
    widgets: [
      TableWidget,
      TableColumnWidget,
      TableColumnsWidget,
      DataFilterWidget,
      DataSortWidget,
      QueryItemWidget,
      TableToolbarWidget,
      BodyCellWidget,
      BodyCellDataItemWidget,
      BodyCellDataTextWidget,
    ],
  },
  {
    name: 'interaction',
    icon: IconClick,
    label: t('Interaction'),
    showType: 'ALL',
    widgets: [ButtonWidget],
  },
  {
    name: 'display',
    icon: IconPresentation,
    label: t('Display'),
    showType: 'ALL',
    widgets: [
      ConditionWidget,
      LinkWidget,
      PageWidget,
      DividerWidget,
      SimpleTextWidget,
      RichTextWidget,
      ImageWidget,
      IconWidget,
      PaginationWidget,
    ],
  },
  {
    name: 'popup',
    icon: IconMessages,
    label: t('Popup'),
    showType: PageType.PAGE,
    widgets: [TooltipWidget, PopconfirmWidget, ModalWidget],
  },
  {
    name: 'container',
    icon: IconBoxModel2,
    label: t('Container'),
    showType: 'ALL',
    widgets: [
      ContainerWidget,
      InnerContainerWidget,
      TabsWidget,
      TabPanelWidget,
    ],
  },
  {
    name: 'layout',
    icon: IconLayout,
    label: t('Layout'),
    showType: 'ALL',
    widgets: [SpaceWidget, FlexWidget, GridWidget, ColWidget],
  },
  {
    name: 'layout2',
    icon: IconLayout,
    label: t('Page Layout'),
    showType: PageType.LAYOUT,
    widgets: [
      LayoutWidget,
      HeaderWidget,
      SiderWidget,
      ContentWidget,
      FooterWidget,
    ],
  },
  {
    name: 'menu',
    icon: IconMenu,
    label: t('Menu'),
    showType: PageType.LAYOUT,
    widgets: [MenuWidget, MenuGroupWidget, MenuItemWidget, MenuDividerWidget],
  },
];

export default groups;
