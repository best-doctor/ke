type Callback<Args extends any[], ReturnType> = (...args: Args) => ReturnType

export function injectInCallback<Args extends any[], ReturnType>(
  callback: Callback<Args, ReturnType>,
  injected: Callback<Args, ReturnType>
): Callback<Args, ReturnType> {
  return (...args) => {
    const callbackResponse = callback(...args)
    injected(...args)
    return callbackResponse
  }
}
