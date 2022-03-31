import React, { Component } from "react";
import axios from "axios";
//import Train_print from "./Train_Button";

class Train extends Component {
  state = {
    text: "파일을 업로드 해주세요",
    image: null,
    train_message: "",
    file_url: "",
    loss: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0],
    });
  };

  handleFileReader = (e) => {
    this.setState({
      file: e.target.files[0],
    });
  };
  handle_message = (e) => {
    setTimeout(() => {
      this.setState({
        train_message: "Train이 완료 되었습니다.",
      });
    }, 10000);
  };
  handle_Train = (e) => {
    e.preventDefault();
    this.setState({
      train_message: "Train이 시작되었습니다.",
    });
    let form_url = new FormData();
    let siu_url = "http://3.37.231.42:8000/list/train/";
    form_url.append("url", this.state.file_url);
    axios
      .post(siu_url, form_url, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        this.setState({
          loss: res.data,
        });
        this.setState({
          train_message: "Train이 완료 되었습니다.",
        });
      })
      .catch((err) => console.log(err));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let form_data = new FormData();
    let url = "http://3.36.143.228:8000/api/posts/";
    form_data.append("file", this.state.file, this.state.file.name);
    console.log(this.state.file);
    axios
      .post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          this.setState({
            text: "업로드가 완료되었습니다",
          });
          console.log(res.data);
          this.setState({
            file_url: res.data,
          });
        } else {
          this.setState({
            text: "업로드 오류",
          });
        }
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div className="Train">
        <form onSubmit={this.handleSubmit}>
          <p>
            <input
              type="file"
              id="file"
              accept=".zip,.rar,.7zip"
              onChange={this.handleFileReader}
              required
            />
          </p>
          <p> {this.state.text} </p>
          <p> {this.state.train_message} </p>
          <p> {this.state.loss} </p>
          <input type="submit" value="Upload" />
          <button onClick={this.handle_Train}>Train</button>
        </form>
      </div>
    );
  }
}

export default Train;
