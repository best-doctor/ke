import styled from '@emotion/styled'

export const StyleDateTime = styled.div`
  .styled-date-time {
    border-width: 1px;
    border-color: #cbd5e0;
    border-radius: 0.25rem;
    padding: 3px;
    height: 40px;
    width: 150px;
  }
  .react-datepicker-popper {
    z-index: 1001 !important;
  }
  .react-datepicker__close-icon {
    height: 40px;
  }
  .react-datepicker__close-icon::after {
    color: #cccccc;
    background-color: transparent;
    font-size: 24px;
  }
`
