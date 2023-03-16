import { ChangeEvent, KeyboardEvent, useState } from "react"
import { Value } from "../reducer"

interface Token {
  isDirty: boolean
  value: string
}

interface TokenizedState {
  stringValue: string,
  tokens: Token[],
  selected: Value[]
}

const SPECIAL_CHAR = "*"

const isCommaRemovalAttempt = (currentValue: string, event: KeyboardEvent<HTMLInputElement>) => {  
  const valueIndex = event.target.selectionStart - 1

  if (event.code !== "Backspace") return false

  return currentValue.charAt(valueIndex) === ","
}

const markEditionPlace = (currentValue: string, selection: number) => {
  return `${currentValue.slice(0, selection)}${SPECIAL_CHAR}${currentValue.slice(selection)}`
}

const isMarkedPlace = (element: string) => {
  return element.includes(SPECIAL_CHAR)
}

const cleanMark = (element: string) => {
  return element.replace(SPECIAL_CHAR, "")
}

const cleanToDirty = (el: string) => {
  if (isMarkedPlace(el)) {
    return { isDirty: true, value: cleanMark(el) }
  }

  return { isDirty: false, value: el }
}

const stringToToken = (el: string) => {
  return { isDirty: false, value: el }
}

const createTokensFromValue = (initialValue: string) => {
  return initialValue
    .split(",")
    .map(stringToToken)
}

const generateDirtyTokens = (editedValue: string) => {
  return editedValue
    .split(",")
    .map(cleanToDirty)
}

const cleanDirtyToken = (tokens: Token[], value: string) => {
  return tokens.map(tk => {
    if (tk.isDirty) {
      return { isDirty: false, value }
    }

    return tk
  })
}

const generateValueFromTokens = (tokensValues: string[]) => {
  return tokensValues.join(",") + ","
}

const obtainCleanTokens = (tokens: Token[]) => {
  return tokens.filter(t => !t.isDirty)
}

const obtainCleanSelected = (selected: Value[], tokenValues: string[]) => {
  return selected.filter(byTokenValues(tokenValues))
}

const obtainTokenValues = (tokens: Token[]) => {
  return tokens.filter(t => t.value).map(t => t.value)
}

const obtainSearchInput = (tokens: Token[]) => {
  return tokens.find(t => t.isDirty)?.value || ""
}

const obtainNonEmptyTokens = (tokens) => {
  return tokens.filter(t => t.value.length > 0)
}

const byTokenValues = (tokensValues: string[]) => (el: Value) => {
  return tokensValues.includes(el.displayName)
}

export const useTokenizedValue = (initial: string) => {
  const [tokenizedState, setTokenizedState] = useState<TokenizedState>({
    stringValue: initial,
    tokens: createTokensFromValue(initial),
    selected: []
  })

  const keyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (isCommaRemovalAttempt(tokenizedState.stringValue, event)) {
      event.preventDefault()      
    }
  }

  const change = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: newValue, selectionStart} = event.target
    const newTokens = generateDirtyTokens(markEditionPlace(newValue, selectionStart))

    setTokenizedState({
      stringValue: newValue,
      tokens: newTokens,
      selected: tokenizedState.selected
    })
  }

  const changeAt = (item: Value) => {
    const newTokens = cleanDirtyToken(tokenizedState.tokens, item.displayName)
    const tokenValues = obtainTokenValues(newTokens)
    const newValue = generateValueFromTokens(tokenValues)

    setTokenizedState({
      stringValue: newValue,
      tokens: newTokens,
      selected: tokenizedState.selected.concat(item)
    })
  }

  const clean = () => {
    setTokenizedState((currentState) => {
      const cleanTokens = obtainCleanTokens(currentState.tokens)
      const tokenValues = obtainTokenValues(cleanTokens)
      const cleanValue = generateValueFromTokens(tokenValues)
      const cleanSelected = obtainCleanSelected(currentState.selected, tokenValues)

      return {
        stringValue: cleanValue,
        tokens: cleanTokens,
        selected: cleanSelected
      }
    })
  }

  return {
    changeAt,
    change,
    keyDown,
    clean,
    value: tokenizedState.stringValue,
    selected: tokenizedState.selected,
    tokens: obtainNonEmptyTokens(tokenizedState.tokens),
    input: obtainSearchInput(tokenizedState.tokens)
  }
}