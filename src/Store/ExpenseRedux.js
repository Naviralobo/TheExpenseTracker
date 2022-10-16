import { createSlice } from "@reduxjs/toolkit";

const initialExpState = { expenses: [], isPremium: false, totalAmount: 0 };

const expSlice = createSlice({
  name: "expense",
  initialState: initialExpState,
  reducers: {
    addExpense(state, action) {
      state.expenses = action.payload;
      let totalAmount = 0;
      state.expenses.forEach(
        (expense) => (totalAmount += Number(expense.amount))
      );
      state.totalAmount = totalAmount;
      if (totalAmount > 10000) {
        state.isPremium = true;
      }
      if (totalAmount < 10000) {
        state.isPremium = false;
      }
    },
  },
});

export const expActions = expSlice.actions;
export default expSlice.reducer;
