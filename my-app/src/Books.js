import React from "react";
import ListItems1 from "./ListItems1"


class Books extends React.Component {

    
    render() {
        return (
                <div>
                <h1 className="title">图书库存列表</h1>
                <ListItems1 />
                </div>
        );
    }
        
}

export default Books;
