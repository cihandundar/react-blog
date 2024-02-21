import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  details: {},
  status: "",
  isLoading: false,
  error: "",
  categories: [],
};

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (_, { dispatch }) => {
    try {
      const response = await axios.get(
        `https://64542599c18adbbdfeb058b1.mockapi.io/new`
      );
      const categories = response.data.map((item) => item.category);
      const uniqueCategories = [...new Set(categories)];
      dispatch(setCategories(uniqueCategories));
      return response.data;
    } catch (error) {
      console.error("Error fetching data: ", error.message);
      throw error;
    }
  }
);

export const fetchUserDetails = createAsyncThunk(
  "users/fetchUserDetails",
  async (id) => {
    const response = await axios.get(
      `https://64542599c18adbbdfeb058b1.mockapi.io/new/${id}`
    );
    return response.data;
  }
);

export const addNewUser = createAsyncThunk("users/addNewUser", async (body) => {
  const response = await axios.post(
    `https://64542599c18adbbdfeb058b1.mockapi.io/new`,
    body
  );
  return response.data;
});

export const addNewUserWithCategory = createAsyncThunk(
  "users/addNewUserWithCategory",
  async ({ body, category }) => {
    const response = await axios.post(
      `https://64542599c18adbbdfeb058b1.mockapi.io/new`,
      { ...body, category }
    );
    return response.data;
  }
);

export const handleDelete = createAsyncThunk("users/deleteUser", async (id) => {
  await axios.delete(`https://64542599c18adbbdfeb058b1.mockapi.io/new/${id}`);
  return id;
});

export const userSlice = createSlice({
  name: `users`,
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
    builder.addCase(fetchUserDetails.pending, (state) => {
      state.isLoading = true;
      state.status = "loading";
    });
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      state.details = action.payload;
      state.isLoading = false;
      state.status = "success";
    });
    builder.addCase(fetchUserDetails.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
      state.status = "failed";
    });
    builder.addCase(addNewUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addNewUser.fulfilled, (state, action) => {
      state.data = [...state.data, action.payload];
      state.isLoading = false;
    });
    builder.addCase(addNewUser.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
    builder.addCase(handleDelete.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(handleDelete.fulfilled, (state, action) => {
      state.data = state.data.filter((post) => post.id !== action.payload);
      state.isLoading = false;
    });
    builder.addCase(handleDelete.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
    builder.addCase(addNewUserWithCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addNewUserWithCategory.fulfilled, (state, action) => {
      state.data = [...state.data, action.payload];
      state.isLoading = false;
    });
    builder.addCase(addNewUserWithCategory.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export const { editTask, setCategories } = userSlice.actions;

export default userSlice.reducer;
