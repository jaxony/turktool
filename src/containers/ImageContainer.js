import { connect } from "react-redux";
import Image from "../components/Image.js";
import { setImageProps } from "../actions";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
  return {
    imageURL: ownProps.imageURL
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setImageProps: (height, width, offsetX, offsetY) => {
      dispatch(setImageProps(height, width, offsetX, offsetY));
    }
  }
}

const ImageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Image));

export default ImageContainer;