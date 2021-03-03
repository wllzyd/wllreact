import React, { Component } from 'react';
import PubSub from 'pubsub-js'
import Search from './components/search'
import StuTable from './components/stuTable'
class Index  extends Component {
    render() {
        return (
            <>
                <Search/>
                <StuTable/>
            </>
        );
    }
    
}

export default Index;
