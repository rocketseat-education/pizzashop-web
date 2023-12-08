import { render } from '@testing-library/react'

import { OrderStatus } from './order-status'

describe('Order Status', () => {
  it('should display the right text based on order status', () => {
    let wrapper = render(<OrderStatus status="pending" />)

    expect(wrapper.getByText('Pendente')).toBeInTheDocument()

    wrapper = render(<OrderStatus status="processing" />)

    expect(wrapper.getByText('Em preparo')).toBeInTheDocument()

    wrapper = render(<OrderStatus status="delivering" />)

    expect(wrapper.getByText('Em entrega')).toBeInTheDocument()

    wrapper = render(<OrderStatus status="delivered" />)

    expect(wrapper.getByText('Entregue')).toBeInTheDocument()

    wrapper = render(<OrderStatus status="canceled" />)

    expect(wrapper.getByText('Cancelado')).toBeInTheDocument()
  })
})
