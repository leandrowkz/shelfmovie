import React from 'react'
import { useTesting } from 'src/hooks/useTesting'
import { NewPassword } from '.'

const { renderComponent, screen } = useTesting()

test('should render content properly', () => {
  renderComponent(<NewPassword />)

  expect(screen.getByText('Reset your password')).toBeVisible()
  expect(screen.getByTestId('input-email')).toBeVisible()
  expect(screen.getByTestId('btn-submit')).toBeVisible()
})