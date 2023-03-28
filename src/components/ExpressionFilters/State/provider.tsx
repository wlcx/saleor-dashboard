import { Dropdown, DropdownButton } from "@saleor/macaw-ui/next";
import React, { ReactNode, useEffect, useReducer } from "react";
import { FormattedMessage } from "react-intl";

import { Content } from "./../Content";
import { Footer } from "./../Footer";
import { FilterContext } from "./context";
import { filterReducer } from "./reducer";
import {
  AutocompleteOperand,
  Condition,
  ConditionValue,
  DropdownOperand,
  FilterKind,
  FilterState,
  NumberOperand,
  RangeOperand,
  TextOperand,
  Value,
} from "./types";

interface ProviderProps {
  filter: FilterState;
  children: ReactNode;
  reducer: typeof filterReducer;
}

export const Provider = ({ children, reducer, filter }: ProviderProps) => {
  const [filters, dispatch] = useReducer(reducer, filter);

  useEffect(() => {
    dispatch({ type: "INIT", payload: { filters: filter } });
  }, [filter]);

  const changeFilterKind = (currentKind: FilterKind, newValue: Value) => {
    dispatch({
      type: "CHANGE_FILTER_KIND",
      payload: { currentKind, newValue },
    });
  };

  const addEmptyExpression = () => {
    dispatch({ type: "ADD_EMPTY" });
  };

  const changeDropdownOperand = (operand: DropdownOperand, newValue: Value) => {
    dispatch({ type: "CHANGE_DROPDOWN", payload: { operand, newValue } });
  };

  const changeAutocompleteOperand = (
    operand: AutocompleteOperand,
    newValues: Value[],
  ) => {
    dispatch({ type: "CHANGE_AUTOCOMPLETE", payload: { operand, newValues } });
  };

  const changeRangeOperand = (
    operand: RangeOperand,
    leftValue: number,
    rightValue: number,
  ) => {
    dispatch({
      type: "CHANGE_RANGE",
      payload: { operand, leftValue, rightValue },
    });
  };

  const changeNumberOperand = (operand: NumberOperand, newValue: number) => {
    dispatch({ type: "CHANGE_NUMBER", payload: { operand, newValue } });
  };

  const changeTextOperand = (operand: TextOperand, newValue: string) => {
    dispatch({ type: "CHANGE_TEXT", payload: { operand, newValue } });
  };

  const changeCondition = (
    currentConditon: Condition,
    newValue: ConditionValue,
  ) => {
    dispatch({
      type: "CHANGE_CONDITION",
      payload: { currentConditon, newValue },
    });
  };

  const removeExpression = (currentKind: FilterKind) => {
    dispatch({ type: "REMOVE_EXPRESSION", payload: { currentKind } });
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        changeFilterKind,
        addEmptyExpression,
        changeCondition,
        changeDropdownOperand,
        changeAutocompleteOperand,
        changeRangeOperand,
        changeNumberOperand,
        changeTextOperand,
        removeExpression,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

interface FilterProviderProps extends ProviderProps {
  onShowClick: (filtersInput: FilterState) => void;
}

export const FilterProvider = ({
  filter,
  children,
  reducer,
  onShowClick,
}: FilterProviderProps) => (
  <Provider filter={filter} reducer={reducer}>
    <Dropdown>
      <Dropdown.Trigger>
        <DropdownButton data-test-id="show-filters-button">
          <FormattedMessage
            id="FNpv6K"
            defaultMessage="Filters"
            description="button"
          />
        </DropdownButton>
      </Dropdown.Trigger>
      <Content>
        {children}
        <Footer onShowClick={onShowClick} />
      </Content>
    </Dropdown>
  </Provider>
);
