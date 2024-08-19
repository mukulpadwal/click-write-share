import { createSlice } from "@reduxjs/toolkit";

const initialState: { blogs: [{}] } = {
  blogs: [{}],
};

const blogSlice = createSlice({
  name: "blog",
  initialState: initialState,
  reducers: {
    allBlogs: (state, action) => {
      state.blogs = action?.payload?.blogsData;
    },
    addBlog: (state, action) => {
      state.blogs.push(action.payload.blog);
    },
  }
});

export const { allBlogs, addBlog } = blogSlice.actions;
export default blogSlice.reducer;
