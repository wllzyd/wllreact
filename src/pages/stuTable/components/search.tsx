import React, { Component } from 'react';
import { Form, Input, Button, Radio,Select } from 'antd';
import { FormInstance } from 'antd/lib/form';
import PubSub from 'pubsub-js';


class search extends Component {
    //const { Option } = Select;
    
     formRef = React.createRef<FormInstance>()||{};
  render() {
    
    return (
      <>
        <Form
          name="control-ref"
          ref={this.formRef}
          layout="inline"
          onFinish={(value)=>{ console.log(value); PubSub.publish('search',value) }}
          onFinishFailed={(err)=>{}}
          
        >
          
          <Form.Item label="姓名" name = 'name'>
            <Input  />
          </Form.Item>
         
          
        </Form>
      </>
    );
    
  }
  

 
}

export default search;
