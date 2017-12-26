import { connect } from "react-redux";
import Image from "../components/Image.js";
import { setImageProps } from "../actions";

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    setImageProps: (height, width, offsetX, offsetY) => {
      dispatch(setImageProps(height, width, offsetX, offsetY));
    }
  }
}

const ImageContainer = connect(mapStateToProps, mapDispatchToProps)(Image);

export default ImageContainer;