import { autocompletion } from '@codemirror/autocomplete';
import { javascript } from '@codemirror/lang-javascript';
import { tags as t } from '@lezer/highlight';
import { createTheme } from '@uiw/codemirror-themes';
import type { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import CodeMirror from '@uiw/react-codemirror';
import styled, { useTheme } from 'styled-components';

const StyledEditorWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  .cm-handlebars {
    color: #ff6347; /* 红色高亮 Handlebars 语法 */
    font-weight: bold;
  }
  > div {
    width: 100%;
    height: 100%;
  }

  &.disabled {
    .cm-editor {
      border-color: ${({ theme }) => theme.colorBorder};
      background-color: ${({ theme }) => theme.colorBgContainerDisabled};
    }
  }

  .cm-editor {
    border: 1px solid ${({ theme }) => theme.colorBorder};
    border-radius: ${({ theme }) => theme.borderRadius}px;
    transition: border-color 0.3s ease;

    .cm-activeLine {
      background-color: transparent;
    }

    .cm-line {
      font-family: 'JetBrains Mono NL', SFMono, Menlo, consolas, monaco,
        monospace;
      font-size: ${({ theme }) => theme.fontSize}px;
    }

    .cm-gutters {
      border-right: none;
      border-top-left-radius: ${({ theme }) => theme.borderRadius}px;
      border-bottom-left-radius: ${({ theme }) => theme.borderRadius}px;

      .cm-lineNumbers {
        font-family: 'JetBrains Mono NL', SFMono, Menlo, consolas, monaco,
          monospace;
        color: ${({ theme }) => theme.colorTextTertiary};
        font-size: ${({ theme }) => theme.fontSize}px;
      }

      .cm-activeLineGutter {
        background-color: transparent;
      }
    }

    &.cm-focused {
      border-color: ${({ theme }) => theme.colorPrimary};
      outline: none;
    }

    &:hover {
      border-color: ${({ theme }) => theme.colorPrimaryHover};
    }
  }
`;

interface EditorProps extends ReactCodeMirrorProps {}

const Editor = (props: EditorProps) => {
  const { className, ...rest } = props;
  const theme = useTheme();

  const myTheme = createTheme({
    theme: 'light',
    settings: {
      background: '#ffffff',
      caret: '#5d00ff',
      selection: '#036dd626',
      selectionMatch: '#036dd626',
    },
    styles: [
      { tag: t.variableName, color: theme.colorTextSecondary },
      { tag: t.string, color: '#5c6166' },
      { tag: t.number, color: '#5c6166' },
      { tag: t.bool, color: '#5c6166' },
      { tag: t.null, color: '#5c6166' },
      { tag: t.keyword, color: '#5c6166' },
      { tag: t.operator, color: '#5c6166' },
      { tag: t.typeName, color: '#5c6166' },
      { tag: t.brace, color: theme.colorSuccessText },
      { tag: t.tagName, color: '#5c6166' },
      { tag: t.propertyName, color: theme.colorPrimary },
      { tag: t.comment, color: '#5c6166' },
      { tag: t.bracket, color: '#5c6166' },
      {
        tag: t.brace,
        color: theme.colorSuccessText,
        background: theme.colorSuccessBg,
      },
    ],
  });

  return (
    <StyledEditorWrapper className={className}>
      <CodeMirror
        {...rest}
        theme={myTheme}
        extensions={[javascript({ jsx: true }), autocompletion()]}
      />
    </StyledEditorWrapper>
  );
};

export default Editor;
