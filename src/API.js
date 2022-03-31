import React, { Component } from "react";
import axios from "axios";
import "./Image.css";

class Inference extends Component {
  state = {
    image: null,
    fileimage: "",
    text: "이미지를 업로드 해주세요",
    inference: "",
    image_url: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0],
      fileimage: URL.createObjectURL(e.target.files[0]),
    });
  };

  handleFileReader = (e) => {
    this.setState({
      file: e.target.files[0],
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let form_data = new FormData();
    let url = "http://3.36.143.228:8000/inference/inference/";
    form_data.append("image", this.state.image, this.state.image.name);
    console.log(this.state.image);
    axios
      .post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.status === 201) {
          this.setState({
            text: "업로드가 완료되었습니다",
          });
          this.setState({
            image_url: res.data,
          });
        } else {
          this.setState({
            text: "업로드 오류",
          });
        }
      })
      .catch((err) => console.log(err));
  };
  handle_Inference = (e) => {
    e.preventDefault();
    let form_url = new FormData();
    let siu_url = "http://3.37.231.42:8000/list/inference/";
    form_url.append("url", this.state.image_url);
    axios
      .post(siu_url, form_url, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        this.setState({
          inference: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div className="Inference">
        <form onSubmit={this.handleSubmit}>
          <p>
            <input
              type="file"
              id="image"
              accept="image/png, image/jpeg"
              onChange={this.handleImageChange}
              required
            />
          </p>
          <div>
            {this.state.fileimage && (
              <img
                alt="sample"
                src={this.state.fileimage}
                className="bgSizeCover"
              />
            )}
          </div>
          <p> {this.state.inference} </p>
          <p> {this.state.text} </p>
          <input type="submit" value="Upload" />
          <button onClick={this.handle_Inference}>Inference</button>
        </form>
      </div>
    );
  }
}

export default Inference;
