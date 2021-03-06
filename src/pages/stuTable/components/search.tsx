import React, { Component } from 'react';
import { Form, Input, Button, Radio,Select, Card } from 'antd';
import { FormInstance } from 'antd/lib/form';
import PubSub from 'pubsub-js';
import { SearchOutlined } from '@ant-design/icons';


const { Option } = Select;
class search extends Component {
    
    
     formRef = React.createRef<FormInstance>()||{};
     state = {sex:1}
  render() {
    
    return (
      <>
        <Card>
          <Form
            initialValues={{
              sex:'',
              grade:''
            }
            }
            name="control-ref"
            ref={this.formRef}
            layout="inline"
            onFinish={(value)=>{ 
              PubSub.publish('search',value)
            }}
            onFinishFailed={(err)=>{}}
            
          >
            
            <Form.Item label="姓名" name = 'name'>
              <Input  allowClear style={{ width: 120 }}/>
            </Form.Item>
            <Form.Item label="年级" name = 'grade'>
              <Select  style={{ width: 120 }}  allowClear>
                <Option value="小学">小学</Option>
                <Option value="初中">初中</Option>
                <Option value="高中">高中</Option>
              </Select>
            </Form.Item>
            <Form.Item label="性别" name = 'sex'>
              <Select  style={{ width: 120 }}  allowClear>
                <Option value="1">男</Option>
                <Option value="2">女</Option>
              </Select>
            </Form.Item>

            <Form.Item label="是否在校" name = 'flag'>
              <Select  style={{ width: 120 }}  allowClear>
                <Option value="1">在校</Option>
                <Option value="2">离校</Option>
              </Select>
            </Form.Item>

            <Form.Item >
              <Button type="primary" htmlType="submit" icon={<SearchOutlined/>}>搜索</Button>
            </Form.Item>

            
          </Form>
        </Card>
      </>
    );
    
  }
  

 
}

export default search;
