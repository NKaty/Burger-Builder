import React from 'react'
import { shallow, mount } from 'enzyme'

import { BurgerBuilder } from "./BurgerBuilder"
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

describe('<BurgerBuilder />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder initIngredients={() => {}}/>)
  })

  it('should render <BuildControls /> when receiving ingredients', () => {
    wrapper.setProps({ingredients: {salad: 0, bacon: 0, cheese: 0, meat: 0}})
    expect(wrapper.find(BuildControls)).toHaveLength(1)
  })
})
