import React, { Component } from 'react';
import {  Card ,Table,Space,Tag,Popconfirm,Modal,message,Tooltip,Button,Radio,Select,Input,Row, Col} from 'antd';
import PubSub from 'pubsub-js';
import { WomanOutlined,ManOutlined ,PlusCircleFilled} from '@ant-design/icons';
import { removeStu, getStu,saveStu } from '@/services/ant-design-pro/stu';

const {Option} = Select;
const stuInit ={
  flag:1,
  sex:1,
  grade:"初中",
  name:""
};
class StuTable extends Component {
    //#region 
    
    state = {data:[],
      currentStu:{
        flag:1,
        sex:1,
        grade:"初中",
        name:""
      },
      isModalShow:false,
      saveLoading:false,
      titleFlag:1,
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
                    this.setState({isModalShow:true,currentStu:record,titleFlag:2})

                }
              }>
                  编辑 
              </a>
              <Popconfirm
                title="确定要删除么?"
                onConfirm={()=>{
                    const dataSource = [...this.state.data]
                    this.setState({data:dataSource.filter((item)=>item.key!=record.key)}, async()=>{await removeStu(record.key) })
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
        const {currentStu,isModalShow,saveLoading,titleFlag} = this.state;
        return (
            <>
                <Card>
                    <Tooltip title="添加学生">
                        <Button type="primary" onClick={()=>this.setState({isModalShow:true,titleFlag:1})} shape="round"  icon={<PlusCircleFilled />} children="添加学生"/>
                    </Tooltip>
                    
                    <Table columns={this.columns} dataSource={this.state.data} />
                    <Modal 
                      title={titleFlag==1?"添加学生":"修改学生"} 
                      visible={isModalShow}  
                      width={300}
                      onOk={this.saveStuData}
                      okText="保存" 
                      onCancel={()=>{this.setState({
                        isModalShow:false,
                        currentStu:{
                          flag:1,
                          sex:1,
                          grade:"初中",
                          name:""
                        }
                      })}}  
                      confirmLoading={saveLoading}
                    >
                        <Row gutter={[16, 16]}>
                        
                          <Col span={24}>
                            姓名：
                            <Input 
                              onChange={(e)=> this.setState({ currentStu:{...currentStu,name:e.target.value}})}
                              value={currentStu.name} 
                              style={{width:"47%"}}
                            />
                          </Col>
                          <Col span={24}>
                            年级：
                            <Select defaultValue={currentStu.grade} style={{ width: 120 }} allowClear onChange={(e)=>{
                              
                              this.setState({currentStu:{...currentStu,grade:e}})
                            }}>
                              <Option value="小学">小学</Option>
                              <Option value="初中">初中</Option>
                              <Option value="高中">高中</Option>
                            </Select>
                          </Col>
                          <Col span={24}>
                            性别：
                            <Radio.Group defaultValue={currentStu.sex}
                              options={[
                                {label:"男",value:1},
                                {label:"女",value:2},
                              ]}
                              onChange={(e)=>{
                                
                                this.setState(
                                  {
                                    currentStu:{ ...currentStu,sex:e.target.value}
                                  })
                              }}
                              optionType="button"
                              buttonStyle="solid"
                            />
                          </Col>
                          <Col span={24}>
                            状态：
                            <Radio.Group defaultValue={currentStu.flag}
                              options={[
                                {label:"在校",value:1},
                                {label:"离校",value:2},
                              ]}
                              onChange={(e)=>{
                                
                                this.setState(
                                  {
                                    currentStu:{ ...currentStu,flag:e.target.value}
                                  })
                              }}
                              optionType="button"
                              buttonStyle="solid"
                            />
                          </Col>
                        </Row>
                        
                    </Modal>
                </Card>
            </>
        );
    }
    saveStuData = async()=>{
      
        this.setState({saveLoading:true})
        await saveStu(this.state.currentStu);
        message.success('保存成功');
        const {data}  = await getStu()
        this.setState({saveLoading:false,currentStu:stuInit,isModalShow:false,data})
    }

    async componentDidMount(){
        
            const result = await getStu()
            this.setState({data:result.data})
        PubSub.subscribe("search",async(_,msg:{})=>{
          
            const data = await getStu(msg);
            this.setState({data:data.data})
        })
    }
    componentWillUnmount(){
      PubSub.unsubscribe("search")
    }
}

export default StuTable;
