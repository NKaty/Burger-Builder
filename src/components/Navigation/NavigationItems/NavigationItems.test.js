import React from 'react'
import { shallow } from 'enzyme'

import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

describe('<NavigationItems />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />)
  })

  it('should render two <NavigationItems /> elements if not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2)
  })

  it('should render three <NavigationItems /> elements if authenticated', () => {
    wrapper.setProps({isAuth: true})
    expect(wrapper.find(NavigationItem)).toHaveLength(3)
  })

  it('should render Logout element if authenticated', () => {
    wrapper.setProps({isAuth: true})
    expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true)
  })
})
