import React from "react";
import axios from "axios";
import Panel from "./Panel";
//import { Modal, Button } from 'react-bootstrap';

class ListItems1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false,
    };
  }
  viewItem = (id, number, name, class1, quantity, note) => {
    Panel.open({
      callback: (data) => {
        // console.log('Products Data: ', data);
      },
      id: id,
      number: number,
      name: name,
      class1: class1,
      quantity: quantity,
      note: note,
      status: false,
    });
  };

  updateItem = (id, number, name, class1, quantity, note) => {
    Panel.open({
      callback: (data) => {
        // console.log('Products Data: ', data);
      },
      id: id,
      number: number,
      name: name,
      class1: class1,
      quantity: quantity,
      note: note,
      status: "update",
    });
  };

  addItem = (id, number, name, class1, quantity, note) => {
    Panel.open({
      callback: (data) => {
        // console.log('Products Data: ', data);
      },
      id: id,
      number: number,
      name: name,
      class1: class1,
      quantity: quantity,
      note: note,
      status: "add",
    });
  };

  deleteItem = (id, number) => {
    // alert('delete');
    // if (this.confirm("Are you sure you want to delete")==false){
    //     return;
    // }

    //this.setState({ showModal: true })
    //   <Modal show={this.state.showModal} onHide={() => this.setState({ showModal: false })} centered>
    //   <Modal.Header closeButton>
    //     <Modal.Title>确认</Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body>本条记录确认删除吗？</Modal.Body>
    //   <Modal.Footer>
    //     <Button onClick={() => this.setState({ showModal: false })}>关闭</Button>
    //   </Modal.Footer>
    // </Modal>

    axios
      .delete("http://localhost:10010/book/deleteStorage1", {
        params: {
          id: id,
        },
      })
      .then((response) => {
        console.log(number);
        //alert("id:" + id + "number:" + number);
        const { books } = this.state;
        const listItem = books.filter((item) => item.key !== number);
        this.setState({
          books: listItem,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount = () => {
    let role;
    let token;
    let url = window.location.search;
    if (url !== "") {
      let tokenAndRole = url.split("?")[1];
      role = tokenAndRole.split("/")[0];
      token = tokenAndRole.split("/")[1];
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
    } else {
      let getSToken = localStorage.getItem("token");
      if (getSToken == null) {
        window.location.href = "http://localhost:1000";
      } else {
        role = localStorage.getItem("role");
        token = getSToken;
      }
    }
    let showElem = false;
    if (role === "admin") {
      showElem = true;
    }

    axios.defaults.headers.common["token"] = token;

    // let showElem = true;
    // axios
    //   .get("http://localhost:8080/book/getStorage1", {

    axios
      .get("http://localhost:10010/book/getStorage1", {
        // axios.post('http://localhost:10010/book/postStorage1/',{
        // headers:{'token':token}
        // params:{token}
        // options:{headers}
      })
      .then((response) => {
        const listData = response.data;
        const listItems1 = listData.map((data) => (
          <tr key={data.number}>
            <td width="170px">{data.number}</td>
            <td width="170px">{data.name}</td>
            <td width="50px">{data.class1}</td>
            <td width="170px">{data.quantity}</td>
            <td width="170px">{data.note}</td>
            <td width="50px">
              <button
                type="button"
                onClick={this.viewItem.bind(
                  this,
                  data.id,
                  data.number,
                  data.name,
                  data.class1,
                  data.quantity,
                  data.note
                )}
              >
                查看
              </button>
            </td>
            {showElem ? (
              <td width="50px">
                <button
                  type="button"
                  onClick={this.updateItem.bind(
                    this,
                    data.id,
                    data.number,
                    data.name,
                    data.class1,
                    data.quantity,
                    data.note
                  )}
                >
                  修改
                </button>
              </td>
            ) : null}
            {showElem ? (
              <td width="50px">
                <button
                  type="button"
                  onClick={this.deleteItem.bind(this, data.id, data.number)}
                >
                  删除
                </button>
              </td>
            ) : null}
            {showElem ? (
              <td width="50px">
                <button
                  type="button"
                  onClick={this.addItem.bind(
                    this,
                    data.id,
                    data.number,
                    data.name,
                    data.class1,
                    data.quantity,
                    data.note
                  )}
                >
                  追加
                </button>
              </td>
            ) : null}
          </tr>
        ));
        this.setState({
          books: listItems1,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { books } = this.state;

    return (
      <div>
        <table className="table is-bordered">
          <tbody>
            <tr>
              <th width="60px">编号</th>
              <th width="170px">名称</th>
              <th width="100px">分类</th>
              <th width="170px">数量</th>
              <th width="270px">备注</th>
              <th colSpan="4" width="350px">
                操作
              </th>
            </tr>
            {books}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ListItems1;
