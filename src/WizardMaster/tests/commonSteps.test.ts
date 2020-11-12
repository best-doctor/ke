import { SuccessDisplay, ErrorDisplay } from '../commonSteps'

test('Success common step transition', () => {
  const successCase = new SuccessDisplay('success_case')

  expect(successCase.next({})).resolves.toEqual('forward')
})

test('Error common step transition', () => {
  const errorCase = new ErrorDisplay('error_case')

  expect(errorCase.prev({})).resolves.toEqual('back')
})
