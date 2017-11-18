import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import LabelView from './LabelView.js';

describe(LabelView, () => {
  const imageUrl = "./checkmate.jpg";
  const wrapper = shallow(
    <LabelView imageUrl={require(imageUrl)}/>
  );

  // it('renders and matches out snapshot', () => {
  //   const component = renderer.create(
  //     <LabelView imageUrl={require(imageUrl)} />
  //   );
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapShot();
  // });

  it('tests if drawing rect from top left to bottom right is correct', () => {
    const position = wrapper.instance().calculateRectPos(6, 10, 12, 20);
    expect(position).toEqual({left: 6, top: 10, width: 6, height: 10});
  });

  it('tests if drawing rect from top right to bottom left is correct', () => {
    const position = wrapper.instance().calculateRectPos(12, 10, 6, 20);
    expect(position).toEqual({left: 6, top: 10, width: 6, height: 10});
  });

  it('tests if drawing rect from bottom right to top left is correct', () => {
    const position = wrapper.instance().calculateRectPos(12, 20, 6, 10);
    expect(position).toEqual({left: 6, top: 10, width: 6, height: 10});
  });

  it('tests if drawing rect from bottom left to top right is correct', () => {
    const position = wrapper.instance().calculateRectPos(6, 20, 12, 10);
    expect(position).toEqual({left: 6, top: 10, width: 6, height: 10});
  });
});