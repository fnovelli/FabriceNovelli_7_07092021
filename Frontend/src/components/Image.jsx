import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import "./styles/Image.css"

let externIMGUrl = null;

class Image extends React.Component {

      constructor(props) {
          super(props);
          this.state = {
            image: null
      };
      this.onImageChange = this.onImageChange.bind(this);
    }

    onImageChange = event => {
      if (event.target.files && event.target.files[0]) {
        let img = event.target.files[0];
        this.setState({
          image: URL.createObjectURL(img),
        });

        externIMGUrl = img;
    }
    };

    render() {
      
      return (
        <div>
          <div>
          <div class="image-upload">
          <label for="file-input">
              <img class="image" src={this.state.image} />
              <FontAwesomeIcon icon={faUpload} > </FontAwesomeIcon>
              </label>
              <input id="file-input" type="file" name="image" onChange={this.onImageChange} />
            </div>
          </div>
        </div>
      );
    }
  }
  
  export { Image, externIMGUrl };
  