import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import { HeadingPlugin } from '@udecode/plate-heading/react';

export function getPlugins() {
  return [HeadingPlugin, BoldPlugin, ItalicPlugin, UnderlinePlugin, CodePlugin];
  // {
  //   components: withPlaceholders(
  //     {
  //       [ELEMENT_PARAGRAPH]: PlateElement,
  //       [ELEMENT_IMAGE]: ImageElement,
  //       [MARK_BOLD]: withProps(PlateLeaf, { as: "strong" }),
  //       [MARK_UNDERLINE]: withProps(PlateLeaf, { as: "u" }),
  //       [MARK_ITALIC]: withProps(PlateLeaf, { as: "em" }),
  //     },
  //     placeholder,
  //   ),
  // },
}
