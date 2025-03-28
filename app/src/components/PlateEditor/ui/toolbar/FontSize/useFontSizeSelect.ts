import { useCallback, useEffect, useState } from 'react';
import { getMark, removeMark, select, setMarks } from '@udecode/plate-common';
import {
  focusEditor,
  useEditorRef,
  useEditorSelector,
} from '@udecode/plate-common/react';

export const useFontSizeSelect = (nodeType: string) => {
  const editor = useEditorRef();
  const selectionDefined = useEditorSelector(
    (editor) => !!editor.selection,
    [],
  );
  const fontSize = useEditorSelector(
    (editor) => getMark(editor, nodeType) as string,
    [nodeType],
  );
  const [selectedFontSize, setSelectedFontSize] = useState<string>();

  const updateFontSize = useCallback(
    (value: string) => {
      if (editor.selection) {
        setSelectedFontSize(value);
        select(editor, editor.selection);
        focusEditor(editor);
        setMarks(editor, { [nodeType]: value });
      }
    },
    [editor, nodeType],
  );

  const clearFontSize = useCallback(() => {
    if (editor.selection) {
      select(editor, editor.selection);
      focusEditor(editor);
      if (selectedFontSize) {
        removeMark(editor, { key: nodeType });
      }
    }
  }, [editor, selectedFontSize, nodeType]);

  useEffect(() => {
    if (selectionDefined) {
      setSelectedFontSize(fontSize);
    }
  }, [fontSize, selectionDefined]);

  return {
    selectedFontSize,
    fontSize,
    updateFontSize,
    clearFontSize,
  };
};
