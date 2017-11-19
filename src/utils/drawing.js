/**
 * Convert pair of raw coordinates to a div position
 * to render a rectangle on the screen.
 * @param {Object} imgProps Image properties, including the img
 *  element's `offsetX`, `offsetY`, `height` and `width`.
 * @param {Object} rawBoxCoords Box coordinates of  `startX`, `startY`, 
 *  currX`, and `currY`
 */
export function calculateRectPosition(imgProps, rawBoxCoords) {
  var left = Math.min(
    rawBoxCoords.startX,
    rawBoxCoords.currX
  );
  var top = Math.min(
    rawBoxCoords.startY,
    rawBoxCoords.currY
  );
  var right = Math.max(
    rawBoxCoords.startX,
    rawBoxCoords.currX
  );
  var bottom = Math.max(
    rawBoxCoords.startY,
    rawBoxCoords.currY
  );

  // limit rectangles to the size of the image
  // so user can't draw rectangle that spill out of image
  left = Math.max(imgProps.offsetX, left);
  top = Math.max(imgProps.offsetY, top);
  right = Math.min(imgProps.width + imgProps.offsetX, right);
  bottom = Math.min(imgProps.height + imgProps.offsetY, bottom);

  return {
    left: left - imgProps.offsetX,
    top: top - imgProps.offsetY,
    width: right - left,
    height: bottom - top
  };
}

/**
 * A predicate that returns true if the rectangle defined
 * by the supplied `position` argument is too small.
 * @param {Object} position Contains width and height as keys
 */
export function isRectangleTooSmall(position) {
  if (position.width < 20 || position.height < 20) return true;
  return false;
}
