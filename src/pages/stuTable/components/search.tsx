import React, { Component } from 'react';
import { Form, Input, Button, Radio,Select, Card } from 'antd';
import { FormInstance } from 'antd/lib/form';
import PubSub from 'pubsub-js';

const sexOption = [
  { label: '男', value: 1 },
  { label: '女', value: 2 }
]
const flagOption = [
  { label: '在校', value: 1 },
  { label: '离校', value: 2 }
]
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
                //onChange={this.onChange4}
                //value={sex}
                //defaultValue={sex}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>

            <Form.Item label="是否在校" name = 'flag'>
              <Radio.Group
                options={flagOption}
                //onChange={this.onChange4}
                //value={sex}
                //defaultValue={sex}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>

            <Form.Item >
              <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>

            
          </Form>
        </Card>
      </>
    );
    
  }
  

 
}

export default search;
