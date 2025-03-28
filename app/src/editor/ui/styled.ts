import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100vh;
  }

  body {
    margin: 0px;
    font-family:
      Roboto,
      San Francisco,
      Helvetica Neue,
      Helvetica,
      Arial,
      PingFangSC-Regular,
      Hiragina Sans GB,
      WenQuanYi Micro Hei,
      microsoft yahei ui,
      microsoft yahei,
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow: hidden;
  }

  body.dragging {
    cursor: grabbing !important;
    user-select: none;
    
    .ant-picker-dropdown,
    .ant-color-picker,
    .ant-select-dropdown {
      display: none !important;
    }

    .ant-popover {
      display: none !important;
    }
  }

  .app {
    position: relative;
    display: flex;
    flex: 1;
    min-height: 0;
    width: 100%;
    height: 100%;
  }

  .rich-text-modal-wrapper {
    pointer-events: none;
  }

  .sketch-picker {
    box-shadow: none !important;
    border-radius: ${({ theme }) => theme.borderRadius}px !important;
  }
  .ant-input-textarea-show-count .ant-input-data-count {
    bottom: 0px !important;
    right: 4px !important;
  }

  .ant-color-picker-trigger {
    padding: 4px 6px;
    width: 100%;
    justify-content: flex-start;
    .ant-color-picker-color-block,
    .ant-color-picker-clear {
      height: 16px;
      width: 16px;
    }
    .ant-color-picker-trigger-text {
      width: calc(100% - 16px);
    }
  }
`;

export const StyledSidebarWrapper = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  padding: 2px 12px 0px 2px;
  background-color: white;
  overflow: hidden;
`;

export const StyledExtraBottom = styled.div`
  height: 60px;
`;
