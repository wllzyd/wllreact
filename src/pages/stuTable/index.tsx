import React, { Component } from 'react';
import PubSub from 'pubsub-js'
class Index  extends Component {
    render() {
        return (
            <>
                
            </>
        );
    }
    componentDidMount(){
        PubSub.subscribe("search",(msg:{})=>{
            console.log(msg);
        })
    }
}

export default Index;
