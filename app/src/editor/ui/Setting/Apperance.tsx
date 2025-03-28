import { Col, Divider, Row, Select } from 'antd';
import { t } from 'i18next';
import { StyledContainer, StyledItemLabel } from './styled';
import ThemeSelector from './ThemeSelector';

const langs = [
  {
    value: 'zh-CN',
    label: '简体中文',
  },
  {
    value: 'eng-US',
    label: 'English',
  },
];
const Apperance = () => {
  return (
    <StyledContainer>
      <Row align="middle">
        <Col span={6}>
          <StyledItemLabel>
            <span>{t('Language')}</span>
            <span>{t('Select the language of the application')}</span>
          </StyledItemLabel>
        </Col>
        <Col span={18}>
          <Select
            variant="filled"
            options={langs}
            style={{ width: 150 }}
            defaultValue="zh-CN"
          />
        </Col>
      </Row>
      <Divider />
      <Row align="top" gutter={[8, 8]}>
        <Col span={24}>
          <StyledItemLabel>
            <span>{t('Theme')}</span>
            <span>{t('Select the theme of the application')}</span>
          </StyledItemLabel>
        </Col>
        <Col span={24}>
          <ThemeSelector />
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default Apperance;
