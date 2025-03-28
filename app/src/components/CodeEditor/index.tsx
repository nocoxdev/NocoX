import { useState } from 'react';
import { IconExternalLink } from '@tabler/icons-react';
import classNames from 'classnames';
import styled, { useTheme } from 'styled-components';
import DraggableEditor from './DraggableEditor';
import Editor from './Editor';

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const StyledExpandButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  visibility: hidden;
  right: 4px;
  bottom: 4px;
  width: 20px;
  height: 20px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colorBorder};
  border-radius: ${({ theme }) => theme.borderRadius}px;
  color: ${({ theme }) => theme.colorText};
  transition: all 0.2s;
  cursor: pointer;
  ${StyledContainer}:hover & {
    visibility: visible;
  }
`;

interface CodeEditorProps {
  defaultValue?: string;
  value?: string;
  showExpandButton?: boolean;
  height?: string;
  onChange?: (value: string) => void;
}

const CodeEditor = (props: CodeEditorProps) => {
  const {
    defaultValue,
    value,
    onChange,
    showExpandButton = true,
    height,
  } = props;
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleChange = (value: string) => {
    onChange?.(value);
    setOpen(false);
  };

  return (
    <StyledContainer>
      <Editor
        height={height}
        defaultValue={defaultValue}
        width="100%"
        value={value}
        onChange={handleChange}
        basicSetup={{
          lineNumbers: false,
          foldGutter: false,
        }}
        editable={!open}
        className={classNames({ disabled: open })}
      />

      {showExpandButton && (
        <DraggableEditor
          defaultValue={defaultValue}
          value={value}
          onChange={handleChange}
          open={open}
          onOpenChange={setOpen}
        >
          <StyledExpandButton>
            <IconExternalLink size={12} color={theme.colorTextSecondary} />
          </StyledExpandButton>
        </DraggableEditor>
      )}
    </StyledContainer>
  );
};

export default CodeEditor;
