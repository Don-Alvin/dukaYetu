import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
	loading: true,
	products: [],
	productsCount: 0,
};

export const fetchProducts = createAsyncThunk(
	"products/fetchProducts",
	async () => {
		try {
			const response = await axios.get("/products");
			return [...response.data];
		} catch (error) {
			return error.message;
		}
	}
);

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		setProducts: (state, { payload }) => {
			state.products = payload;
			state.productsCount += payload.productsCount;
			state.loading = false;
		},
	},
});

export const { setProducts } = productSlice.actions;
// export const { getAllProducts } = state.products;
export default productSlice.reducer;
