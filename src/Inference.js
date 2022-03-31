import React, { Component } from "react";
import axios from "axios";
import "./Image.css";

class Inference extends Component {
  state = {
    image: null,
    fileimage: "",
    text: "이미지를 업로드 해주세요",
    inference: "",
    siu_url: "http://3.37.231.42:8000/list/inference/",
    image_url: "",
    api: null,
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
  handleMessage = (e) => {
    setTimeout(() => {
      this.setState({
        inference: "해당상품은 카페 아메리카노 Tall입니다.",
      });
    }, 600);
  }; //튜토리얼용
  handleAPI = (e) => {
    this.setState({
      api: (
        <div>
          import requests <br />
          token_url ={this.state.siu_url}
          <br />
          data = &#123;'url':{this.state.image_url} &#125;
          <br />
          result = requests.post(token_url, data = data) <br />
          print(result.text)
        </div>
      ),
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
        this.setState({
          image_url: res.data,
        });
        if (res.status === 201) {
          this.setState({
            text: "업로드가 완료되었습니다",
          });
        } else {
          this.setState({
            text: "업로드 오류",
          });
        }
      })
      .catch((err) => console.log(err));
  };
  axios;

  handle_Inference = (e) => {
    e.preventDefault();
    let form_url = new FormData();
    form_url.append("url", this.state.image_url);
    axios
      .post(this.state.siu_url, form_url, {
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
        <br />
        <div className="Export API">
          <h2 style={{ color: "blue" }}>Export API</h2>
          <button onClick={this.handleAPI}>EXPORT API</button>
          <p> {this.state.api} </p>
        </div>
      </div>
    );
  }
}

export default Inference;
