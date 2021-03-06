import React, { Component } from 'react';
import {  Card ,Table,Space,Tag,Popconfirm,Modal,message,Tooltip,Button,Radio,Select,Input,Row, Col,Upload} from 'antd';
import PubSub from 'pubsub-js';
import { WomanOutlined,ManOutlined ,PlusCircleFilled,UploadOutlined} from '@ant-design/icons';
import { removeStu, getStu,saveStu,saveStuList } from '@/services/ant-design-pro/stu';
import XLSX from 'xlsx'

const {Option} = Select;
const stuInit ={
  flag:'Y',
  sex:1,
  grade:"初中",
  name:""
};
class StuTable extends Component {
    //#region 
    
    state = {data:[],
      currentStu:{
        flag:'Y',
        sex:1,
        grade:"初中",
        name:""
      },
      isModalShow:false,
      saveLoading:false,
      titleFlag:1,
      excleDate:[]
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
                if(record.flag =='N')
                    obj={color:'red',name:"离校"}
                return(
                    
                    <Tag color={obj.color}>{obj.name}</Tag>
                )
                
            }
        },
        {
          title: '操作',
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
                    <Row gutter={[16,16]}>
                      <Col xs={24} sm={24} md={5} lg={5} xl={3}>
                        <Tooltip title="添加学生">
                          <Button type="primary" onClick={()=>this.setState({isModalShow:true,titleFlag:1})} shape="round"  icon={<PlusCircleFilled />} children="添加学生"/>
                        </Tooltip>
                      </Col>
                      <Col xs={24} sm={24} md={5} lg={5} xl={3}>
                        <Tooltip title="下载此模板批量上传学生信息">
                          <Button type="primary" onClick={this.downloadModel} shape="round"  icon={<PlusCircleFilled />} children="下载模板"/>
                        </Tooltip>
                      </Col>
                      <Col xs={24} sm={24} md={5} lg={5} xl={3}>
                        <Tooltip title="需要先下载模板，根据模板格式填写上传">
                        <Upload beforeUpload={this.saveExcle} maxCount={1} accept='.xlsx'>
                          <Button icon={<UploadOutlined />} type="primary">批量上传学生</Button>
                        </Upload>,
                        </Tooltip>
                      </Col>
                      <Col xs={24} sm={24} md={7} lg={7} xl={5} style={{color:'red'}}>
                        *注意：批量添加会删除已有学生
                      </Col>
                    </Row>

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
                          flag:'Y',
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
                                {label:"在校",value:'Y'},
                                {label:"离校",value:'N'},
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
    downloadModel=()=>{
      const header =[{
        name:'姓名',
        sex:'性别',
        grade:"年级"
      }]
      //设置工作簿，表头属性
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(header,{header:['name','sex','grade'],skipHeader: true});
      //创建book对象
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, '学生信息');
      XLSX.writeFile(wb, '学生信息模板.xlsx'); //直接定义死文件名
    }
    saveExcle=(file:any)=>{   
      const that = this;
      let reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload =async function(e) {
        let data = e?.target?.result;
        //BinaryString格式(byte n is data.charCodeAt(n))
        let workbook = XLSX.read(data, {type: 'binary'});

        let  sheetNames = workbook.SheetNames; // 工作表名称集合
        let  worksheet = workbook.Sheets[sheetNames[0]]; // 这里我们只读取第一张sheet 
        let  json = XLSX.utils.sheet_to_json(worksheet);
        json = json.map((item:any)=>{
          return {
            name:item.姓名,
            sex:item.性别=='男'?1:2,
            grade:item.年级,
            flag:'Y'
          }
        })
        try {
          await saveStuList(JSON.stringify(json));
          message.success("批量添加成功");
          const result = await getStu()
          that.setState({data:result.data})
        } catch (error) {
          message.error("网络繁忙");
        }

      };
      return false;
    }
}

export default StuTable;
