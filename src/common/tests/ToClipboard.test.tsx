import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ToClipboard } from '../components/ToClipboard'
import { BaseNotifier } from '../notifier'

describe('ToClipboard', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    })
  })
  it('should copy value into clipboard on click', async () => {
    jest.spyOn(navigator.clipboard, 'writeText')
    render(<ToClipboard value="copied">Copy</ToClipboard>)
    fireEvent.click(screen.getByText('Copy'))
    await waitFor(() => expect(navigator.clipboard.writeText).toHaveBeenCalledWith('copied'))
  })
  it('should not call clipboard without value', async () => {
    jest.spyOn(navigator.clipboard, 'writeText')
    render(<ToClipboard>Copy</ToClipboard>)
    fireEvent.click(screen.getByText('Copy'))
    await waitFor(() => expect(navigator.clipboard.writeText).not.toBeCalled())
  })
  it('should call notifier if clicked', async () => {
    jest.spyOn(navigator.clipboard, 'writeText')
    class Notifier extends BaseNotifier {
      notifySuccess = jest.fn((_?: string) => {})

      notifyError = jest.fn((_?: string) => {})

      notifierHanlder = jest.fn((_?: string) => {})
    }
    const notifier = new Notifier(() => {})
    render(
      <ToClipboard value="copied" notifier={notifier}>
        Copy
      </ToClipboard>
    )
    fireEvent.click(screen.getByText('Copy'))
    await waitFor(() => expect(notifier.notifySuccess).toHaveBeenCalledWith('Скопировано в буфер обмена'))
  })
})
