import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loading: true,
	products: [],
};

const productSlice = createSlice({
	name: "products",
	initialState,
});

export default productSlice.reducer;
