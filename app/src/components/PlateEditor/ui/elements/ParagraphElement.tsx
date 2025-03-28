import { PlateElement, withRef } from '@udecode/plate-common/react';

const ParagraphElement = withRef<typeof PlateElement>((props, ref) => {
  return <PlateElement ref={ref} {...props} />;
});

export default ParagraphElement;
