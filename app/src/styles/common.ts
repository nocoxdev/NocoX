import { createGlobalStyle } from 'styled-components';

const CommonStyles = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  }

  :root {
    --focus-border: ${({ theme }) => theme.colorPrimary};
    --sash-size: 8px;
    --sash-hover-size: 3px;
    --separator-border: ${({ theme }) => theme.colorBorderSecondary};
    --focus-border: ${({ theme }) => theme.colorPrimary};
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: transparent;
  }

  :hover::-webkit-scrollbar-thumb {
    background-color: #ddd;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    -webkit-border-radius: 3px;
    border-radius: 3px;

    &:hover {
      background-color: #ccc;
    }
  }

  .ant-layout {
    .ant-layout-sider {
      .ant-layout-sider-children {
        display: flex;
        flex-direction: column;
        height: 100%;

        .ant-pro-sider-logo {
          a {
            img {
              height: 28px;
            }
            h1 {
              font-size: 16px;
            }
          }
        }

        .ant-pro-sider-footer {
          padding-block-end: 0px;
        }
      }
    }

    .ant-layout {
      .ant-pro-page-container-children-container {
        padding-inline: 24px;
      }
    }
  }

  .ant-notification-notice-message {
    margin-bottom: 0 !important;
  }

  .ant-notification-notice-description:not(:empty) {
    margin-top: 8px;
  }

  .ant-spin-fullscreen {
    background-color: #fff;

    .ant-spin .ant-spin-dot-holder {
      color: ${({ theme }) => theme.colorPrimary};
    }
  }
  .ant-form-vertical {
    .ant-form-item .ant-form-item-label {
      padding-bottom: 4px !important;
      > label.ant-form-item-required:not(
          .ant-form-item-required-mark-optional
        ) {
        &::before {
          position: absolute;
          right: 0px;
        }
      }
    }
  }

  .ant-splitter-bar-dragger {
    &::after {
      display: none;
    }
  }

  .ant-splitter-horizontal > .ant-splitter-bar {
    border-right: 1px solid ${({ theme }) => theme.colorBorderSecondary};
  }

  .ant-splitter-vertical > .ant-splitter-bar {
    border-top: 1px solid ${({ theme }) => theme.colorBorderSecondary};
  }

  .ant-splitter .ant-splitter-panel {
    scrollbar-width: auto;
    padding: 0px;
  }

  .ant-splitter > .ant-splitter-bar {
    .ant-splitter-bar-dragger {
      &:not(.ant-splitter-bar-dragger-active) {
        &::before {
          background-color: transparent;
        }
      }
    }

    &:hover {
      .ant-splitter-bar-collapse-bar {
        background-color: ${({ theme }) => theme.colorPrimaryBg};
        color: ${({ theme }) => theme.colorPrimary};
      }
    }

    .ant-splitter-bar-collapse-bar {
      border-radius: ${({ theme }) => theme.borderRadius}px;
      width: 18px;
      height: 36px;
      transition: all 0.2s;

      &:hover {
        background-color: ${({ theme }) => theme.colorPrimary}33;
        color: ${({ theme }) => theme.colorPrimary};
        font-weight: 600;
      }
    }
  }

  .ant-color-picker-trigger {
    align-items: center;
  }

  .ant-menu-inline-collapsed {
    .anticon {
      font-size: 16px !important;
    }
  }

  .ant-menu-light.ant-menu-root.ant-menu-inline,
  .ant-menu-light.ant-menu-root.ant-menu-vertical,
  .ant-menu-light > .ant-menu.ant-menu-root.ant-menu-vertical {
    border-inline-end: none;
  }
`;

export default CommonStyles;
