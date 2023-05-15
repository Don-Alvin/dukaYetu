import { configureStore } from "@reduxjs/toolkit";
import { createDevTools } from "@redux-devtools/core";

const initialState = {};

const store = configureStore({
	initialState,
	reducer: {},
});

export default store;
