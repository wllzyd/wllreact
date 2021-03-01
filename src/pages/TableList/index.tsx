import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Drawer, Timeline } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';

import { getStu, removeStu, addStu, updateStu,stuAllCoin } from '@/services/ant-design-pro/stu'


/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: API.RuleListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addStu({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await updateStu({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 * 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.RuleListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeStu({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const[coinList,setCoinList] = useState([{id:0,createtime:'',amount:0,cause:'',state:1,loading:true}])

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [drawerTitle, setDrawerTitle] = useState<string>('');
  

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);




  /** 国际化配置 */
  const intl = useIntl();

  const columns: ProColumns<API.RuleListItem&{id:number,amount:number}>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.stu.name"
          defaultMessage="学生"
        />
      ),
      dataIndex: 'name',
      render: (dom, entity) => {

        return (
          <a
            onClick={async () => {
              //setCurrentRow(entity);
              setShowDetail(true);
              setCoinList(await stuAllCoin(entity.id)) 
              setDrawerTitle(entity?.name??'')
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.stu.sex" defaultMessage="性别" />,
      dataIndex: 'sex',
      valueEnum: {
        '0': { text: "女", status: 'Warning' },
        '1': { text: "男", status: 'Processing' },
      }


    },
    {
      title: <FormattedMessage id="pages.stu.amount" defaultMessage="币数量" />,
      dataIndex: 'amount',
      sorter: (a, b) => a.amount - b.amount,
      hideInForm: true,
      renderText: (val: string) =>
        `${val} 枚`,
    },
    {
      title: <FormattedMessage id="pages.stu.grade" defaultMessage="年级" />,
      dataIndex: 'grade',
      //hideInForm: true,
      valueType: 'text'
    },
    {
      title: <FormattedMessage id="pages.stu.flag" defaultMessage="是否在校" />,
      dataIndex: 'flag',
      valueEnum: {
        'Y': { text: '在校', status: 'Success' },
        'N': { text: '离校', status: 'error' }
      }
    }
  ];



  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>

        headerTitle={intl.formatMessage({
          id: 'pages.stu.table',
          defaultMessage: '学习币',
        })}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="新建" />
          </Button>,
        ]}
        // request={getStu}
        request={async (res) => { return await getStu(res) }}
        columns={columns}

      />
      
      <ModalForm
        title='添加/扣除知识币'
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.RuleListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={400}
        zIndex={100}
        visible={showDetail}
        title={<div><span>{drawerTitle}</span> <Button type="primary" size="small" onClick={()=>handleModalVisible(true)}> 添加/扣除知识币</Button></div>}
        onClose={() => {
          setShowDetail(false);
        }}

      >

        <Timeline mode='left'>
          {
            coinList.map((item)=>{
              return <Timeline.Item label={item.createtime} key={item.id}>数量:<span style={{color:item.state==1?'green':'red'}}>{item.state==1?'+':'-'}{item.amount}</span>  <br/> 原因: {item.cause}</Timeline.Item>
            })
          }
        </Timeline>

      </Drawer>
    </PageContainer>
  );
};

export default TableList;
