import React, { useRef } from 'react';
import {  ManOutlined,WomanOutlined } from '@ant-design/icons';
import { Button,message } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable  from '@ant-design/pro-table';
import {teacherAll,teacherDel,teacherSave} from '@/services/ant-design-pro/teacher'
import ProForm,{ ModalForm,ProFormText,ProFormRadio} from '@ant-design/pro-form';

type TeacherItem = {
  id:number,
  tname:string,
  sex:number,
  phone:string
};
const columns: ProColumns<TeacherItem>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '姓名',
    dataIndex: 'tname',
  },
  {
    title: '性别',
    dataIndex: 'sex',
    valueType:"select",
    search:false,
    key:"sex",
    valueEnum:{
        1:{text:"男"},
        2:{text:"女"}
    },
    render:(text:any,record:any,index:any,action:any)=>{
        return record.sex==1?<ManOutlined style={{color:'#1890ff'}}/>: <WomanOutlined style={{color:'#ff69b4'}}/>
    }
    
  },
  {
    title: '电话',
    dataIndex: 'phone',
    search: false,
    copyable:true
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
    ],
  },
];
const data:ProColumns<TeacherItem> = [{
    id:11,
    tname:"张三",
    sex:1,
    phone:"123456789"
},
{
    id:222,
    tname:"李四",
    sex:2,
    phone:"123456789"
},];
export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<TeacherItem>
      columns={columns}
      actionRef={actionRef}
      request={async (params = {}) =>{ //搜索查询
        return await teacherAll(params);
      }}
      editable={{
        type: 'single',
        onSave:async(_,row:TeacherItem)=>{
            await teacherSave(row)
        },
        onDelete:async(_,row:TeacherItem)=>{
            await teacherDel(row.id)
        }
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      
      pagination={{
        pageSize: 5,
      }}
      dateFormatter="string"
      headerTitle="老师信息"
      toolBarRender={() => [
        <ModalForm
        width={300}
        title="添加老师"
        trigger={<Button type="primary">添加老师</Button>}
        initialValues={{sex:'1'}}
        submitter={{
          searchConfig: {
            submitText: '确认',
            resetText: '取消',
          },
        }}
        onFinish={async (values) => {
          await teacherSave(values)
          message.success('添加成功');
          actionRef.current.reload();
          return true;
        }}
      > 
      <ProForm.Group >
        <ProFormText width="sm" name="tname" label="姓名" placeholder="请输入姓名"  />
          <ProFormRadio.Group
            
            name="sex"
            label="性别"
            radioType="button"
            options={[
                {
                label: '男',
                value: '1',
                },
                {
                label: '女',
                value: '2',
                },
            ]}
            />
          <ProFormText width="sm" name="phone" label="电话" placeholder="请输入电话" />
      </ProForm.Group>
         
      </ModalForm>
      
      ]}
    />
  );
};