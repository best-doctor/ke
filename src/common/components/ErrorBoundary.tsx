import React, { ErrorInfo } from 'react'
import styled from '@emotion/styled'
import { Heading } from '@chakra-ui/react'
import { loggerContext } from '../../django-spa/aspects/logger/Logger.context'

interface ErrorBoundaryProps {
  errorTitle?: string
}

interface ErrorBoundaryState {
  error: Error | null
  errorInfo: ErrorInfo | null
}

const StyledDetails = styled.details`
  whitespace: pre-wrap;
`

const StyledErrorInfo = styled.pre`
  border-width: 1px;
  border-radius: 3px;
  border-color: #cbd5e0;
  padding: 5.4px;
  white-space: pre-wrap;
  word-wrap: break-word;
`

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // eslint-disable-next-line react/static-property-placement
  static contextType = loggerContext

  // eslint-disable-next-line react/static-property-placement
  context!: React.ContextType<typeof loggerContext>

  private errorTitle: string | undefined

  constructor(props: Readonly<ErrorBoundaryProps>) {
    super(props)
    this.errorTitle = props.errorTitle
    this.state = { error: null, errorInfo: null }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
    })

    // eslint-disable-next-line react/destructuring-assignment
    this.context?.error?.(error)
  }

  render(): React.ReactNode {
    const { errorInfo, error } = this.state
    const { children } = this.props
    if (errorInfo) {
      return (
        <div>
          <Heading as="h4" size="md">
            {this.errorTitle || 'Что-то пошло не так.'}
          </Heading>
          <StyledDetails>
            <>
              <Heading as="h5" size="sm">
                {error && error.toString()}
              </Heading>
            </>
            <StyledErrorInfo>{errorInfo.componentStack}</StyledErrorInfo>
          </StyledDetails>
        </div>
      )
    }
    return children
  }
}
