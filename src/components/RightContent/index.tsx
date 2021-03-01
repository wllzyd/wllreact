import { Tag, Space,message } from 'antd';
import { QuestionCircleOutlined,HeartTwoTone } from '@ant-design/icons';
import React from 'react';
import {  SelectLang } from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';


export type SiderTheme = 'light' | 'dark';

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight: React.FC = () => {
  

 

  let className = styles.right;

 
  return (
    <Space className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="站内搜索"
        defaultValue="心里只有你"
        options={[
          { label: <a href="#">心里只有你</a>, value: '心里只有你' },
          
        ]}
        // onSearch={value => {
        //   console.log('input', value);
        // }}
      />
      <span
        className={styles.action}
        onClick={() => {
          message.success({icon:<HeartTwoTone twoToneColor="#eb2f96" />,content:'偷偷爱你都被发现了'});
        }}
      >
        <QuestionCircleOutlined />
      </span>
      <Avatar />
      {REACT_APP_ENV && (
        <span>
          <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
        </span>
      )}
      <SelectLang className={styles.action} />
    </Space>
  );
};
export default GlobalHeaderRight;
