import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { NavLink } from './nav-link'

describe('NavLink', () => {
  it('should highlight when is the current page link', () => {
    const activeRoutePath = '/about'

    const wrapper = render(
      <MemoryRouter initialEntries={[activeRoutePath]}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </MemoryRouter>,
    )

    expect(wrapper.getByText('Home').dataset).toEqual({
      current: 'false',
    })

    expect(wrapper.getByText('About').dataset).toEqual({
      current: 'true',
    })
  })
})
