export interface IPlateText {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
}

export interface IPlateElement {
  type: string;
  children?: IPlateNode[];
  align?: 'left' | 'center' | 'right';
}

export interface IImageElement extends IPlateElement {
  url: string;
  width: number;
  height: number;
}

export type IPlateNode = IPlateElement | IPlateText;
