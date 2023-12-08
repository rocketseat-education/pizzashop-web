import { render, RenderResult } from '@testing-library/react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { Mock } from 'vitest'

import { Pagination } from './pagination'

let user: UserEvent
let onPageChangeCallback: Mock<[number], void>

describe('Pagination', () => {
  beforeEach(() => {
    user = userEvent.setup()
    onPageChangeCallback = vi.fn()
  })

  it('should calculate the right amount of pages', () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    )

    expect(wrapper.getByText('Página 1 de 20')).toBeInTheDocument()
    expect(wrapper.getByText('Total de 200 item(s)')).toBeInTheDocument()
  })

  it('should be able to navigate to the next page', async () => {
    const wrapper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    )

    const nextPageButton = wrapper.getByRole('button', {
      name: 'Próxima página',
    })

    await user.click(nextPageButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(1)
  })

  it('should be able to navigate to the previous page', async () => {
    const wrapper = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    )

    const nextPageButton = wrapper.getByRole('button', {
      name: 'Página anterior',
    })

    await user.click(nextPageButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(4)
  })

  it('should be able to navigate to the first page', async () => {
    const wrapper = render(
      <Pagination
        pageIndex={8}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    )

    const nextPageButton = wrapper.getByRole('button', {
      name: 'Primeira página',
    })

    await user.click(nextPageButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(0)
  })

  it('should be able to navigate to the last page', async () => {
    const wrapper = render(
      <Pagination
        pageIndex={8}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChangeCallback}
      />,
    )

    const nextPageButton = wrapper.getByRole('button', {
      name: 'Última página',
    })

    await user.click(nextPageButton)

    expect(onPageChangeCallback).toHaveBeenCalledWith(19)
  })
})
