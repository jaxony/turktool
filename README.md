# turktool
`turktool` is a slick, modern React app for scalable bounding box annotation of images. You can connect it to Amazon Mechanical Turk and/or a custom backend to fulfill your deepest data labelling desires.

This project was bootstrapped with `create-react-app`. You can find the original (and incredibly useful) README.md [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

Check out the live [demo](https://jaxony.github.io/turktool/) hosted on GitHub Pages.

## Features
- Redux undo and redo of bounding boxes using keyboard
- Crosshairs for maximum accuracy
- Toggling crosshairs using keyboard
- POSTing annotations to Mechanical Turk via a form
- GETting image from a URL

## Non-features
- Object classification is not support (I treat this as a separate task)
