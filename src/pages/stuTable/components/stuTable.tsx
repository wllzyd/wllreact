import React, { Component } from 'react';
import {  Card ,Table,Space,Tag,Popconfirm,Modal,message,Tooltip,Button,Form,Radio,Select,Input} from 'antd';
import PubSub from 'pubsub-js';
import { WomanOutlined,ManOutlined ,PlusCircleFilled} from '@ant-design/icons';
import { removeStu, getStu,saveStu } from '@/services/ant-design-pro/stu'
const sexOption = [
    { label: '男', value: 1 },
    { label: '女', value: 2 }
  ]
  const flagOption = [
    { label: '在校', value: 1 },
    { label: '离校', value: 2 }
  ]
  const { Option } = Select;
class StuTable extends Component {
    //#region 
    formRef = React.createRef<FormInstance>()||{};
    state = {data:[{
        key: 1,
        name: 'John Brown',
        sex: 1,
        grade: '初中',
        flag: 1,
      }],
      currentStu:null,
      isModalShow:false,
      saveLoading:false
    }
    columns = [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '性别',
          dataIndex: 'sex',
          key: 'sex',
          render:(_,record)=>{
            
              return (<>
                        {
                            record.sex==1?<ManOutlined style={{color:'#1890ff'}}/>: <WomanOutlined style={{color:'#ff69b4'}}/>
                        }
                       
                    </>)
          }
        },
        {
          title: '年级',
          dataIndex: 'grade',
          key: 'grade',
        },
        {
            title: '是否在校',
            dataIndex: 'flag',
            key: 'flag',
            render:(_,record)=>{
                
                let obj = {color:'green',name:"在校"}
                if(record.flag ==2)
                    obj={color:'red',name:"离校"}
                return(
                    
                    <Tag color={obj.color}>{obj.name}</Tag>
                )
                
            }
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <a onClick={
                ()=>{
                    this.setState({isModalShow:true,currentStu:record})
                }
              }>
                  编辑 
              </a>
              <Popconfirm
                title="确定要删除么?"
                onConfirm={(record)=>{
                    const dataSource = [...this.state.data]
                    this.setState({data:dataSource.filter((item)=>item.key==record.key)}, async()=>{await removeStu(record.key) })
                    message.success('删除成功');
                }}
                //onCancel={cancel}
                okText="Yes"
                cancelText="No"
                >
                <a href="#">删除</a>
            </Popconfirm>
            </Space>
          ),
        },
      ];
      //#endregion
    
 
    render() {
        const {currentStu,isModalShow,saveLoading} = this.state;
        return (
            <>
                <Card>
                    <Tooltip title="添加学生">
                        <Button type="primary" onClick={()=>this.setState({isModalShow:true})} shape="round"  icon={<PlusCircleFilled />} children="添加学生"/>
                    </Tooltip>
                    
                    <Table columns={this.columns} dataSource={this.state.data} />
                    <Modal title={!currentStu?"添加用户":"修改用户"} visible={isModalShow} footer={null} onOk={this.saveStuData} onCancel={()=>{this.setState({isModalShow:false,currentStu:null})}}  confirmLoading={saveLoading}>
                    <Card>
          <Form
            initialValues={{
              sex:1,
              grade:'初中'
            }
            }
            name="control-ref"
            ref={this.formRef}
            layout="inline"
            onFinish={(value)=>{ 
              console.log(value); 
              PubSub.publish('search',value)
            }}
            onFinishFailed={(err)=>{}}
            
          >
            
            <Form.Item label="姓名" name = 'name'>
              <Input  allowClear/>
            </Form.Item>
            <Form.Item label="年级" name = 'grade'>
              <Select  style={{ width: 120 }}  allowClear>
                <Option value="小学">小学</Option>
                <Option value="初中">初中</Option>
                <Option value="高中">高中</Option>
              </Select>
            </Form.Item>
            <Form.Item label="性别" name = 'sex'>
              <Radio.Group
                options={sexOption}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>

            <Form.Item label="是否在校" name = 'flag'>
              <Radio.Group
                options={flagOption}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>

            <Form.Item >
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>

          </Form>
        </Card>
                        
                    </Modal>
                </Card>
            </>
        );
    }
    saveStuData = async()=>{
        this.setState({saveLoading:true})
        await saveStu(this.state.currentStu);
        message.success('保存成功');
        this.setState({saveLoading:false,currentStu:null})
    }

    componentDidMount(){
        PubSub.subscribe("search",async(_,msg:{})=>{
            const data = await getStu(msg);
            this.setState({data})
        })
    }
}

export default StuTable;
