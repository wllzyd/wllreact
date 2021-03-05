import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Drawer, Timeline } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDigit,
  ProFormSelect,
  ProFormDatePicker,
  ProFormTextArea
}  from '@ant-design/pro-form';


import { getStuCoin,stuAllCoin,saveCoin} from '@/services/ant-design-pro/stu'
import {teacherAll} from '@/services/ant-design-pro/teacher'





const TableList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  //知识币列表
  const[coinList,setCoinList] = useState([{id:0,createtime:'',amount:0,cause:'',state:1,loading:true}])
  //右侧抽屉
  const [showDetail, setShowDetail] = useState<boolean>(false);
  //抽屉标题
  const [drawerTitle, setDrawerTitle] = useState<string>('');
  

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState({name:'',key:1,id:''});
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);
  const [teachers, setTeachers] = useState([]);

  React.useEffect(async() => {
    const data = await teacherAll()
    const result = data.data.map(t=>{
      return {label:t.tname,value:t.id}
    })
    setTeachers(result);
  },[])

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
              setCurrentRow(entity);
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
        '2': { text: "女", status: 'Warning' },
        '1': { text: "男", status: 'Processing' },
      }


    },
    {
      title: <FormattedMessage id="pages.stu.amount" defaultMessage="币数量" />,
      dataIndex: 'amount',
      sorter: (a, b) => a.amount - b.amount,
      hideInForm: true,
      hideInSearch:true,
      renderText: (val: string) =>
        `${val} 枚`,
    },
    {
      title: <FormattedMessage id="pages.stu.grade" defaultMessage="年级" />,
      dataIndex: 'grade',
      hideInForm: true,
      hideInSearch:true,
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
        // request={getStuCoin}
        request={async (res) => { 
          return await getStuCoin(res) 
        }}
        columns={columns}

      />
      
      <ModalForm
        modalProps={{okText:"保存"}}
        title={`添加/扣除知识币(${drawerTitle})`}
        width={400}
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          value.stuidfk =currentRow.id;
          await saveCoin(value);
          message.success("保存成功")
          setCoinList(await stuAllCoin(value.stuidfk)) 
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          
        }}
      >
        <ProForm.Group>
          
        <ProFormSelect
          options={teachers}
          label="操作人"
          width={90}
          name="tidfk"
          
        />

        <ProFormSelect
          options={[
            {
              value: '1',
              label: '增加',
            },
            {
              value: '2',
              label: '减少',
            },
          ]}
          label="知识币状态"
          width={90}
          name="state"
          
        />
        <ProFormDigit name="amount" label="数量"  width={90} min={1}/>
        <ProFormDatePicker name="createtime" label="日期" />
        <ProFormTextArea
          name="cause"
          label="原因"
          placeholder="请输入原因"
          //fieldProps={inputTextAreaProps}
        />
        </ProForm.Group>
        
      </ModalForm>
     

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
