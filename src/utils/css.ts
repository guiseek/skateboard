import {create} from './create'

export const css = (strings: TemplateStringsArray, ...values: string[]) => {
  const style = create('style')
  style.innerHTML = strings.reduce((prev, curr, index) => {
    return prev + values[index - 1] + curr
  })
  return style
}
