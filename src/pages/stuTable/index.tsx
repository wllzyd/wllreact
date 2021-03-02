import React, { Component } from 'react';
import PubSub from 'pubsub-js'
import Search from './components/search'
class Index  extends Component {
    render() {
        return (
            <>
                <Search/>
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
