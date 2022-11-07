import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  asyncPosts: [],
  term: "",
  staticTerm: "",
  filteredPost: [],
  subReddit: "popular",
  noMatches: false,
  isLoadingPosts: false,
  hasErrorPosts: false,
  isLoadingComments: false,
  hasErrorComments: false,
};

export const asyncLoadPosts = createAsyncThunk(
  "app/asyncLoadPosts",
  async (subReddit) => {
    const res = await fetch(`https://www.reddit.com/r/${subReddit}.json`);
    const json = await res.json();
    const posts = json.data.children.map((child) => child.data);
    return posts.map((post) => ({ ...post, comments: [] }));
  }
);

export const asyncLoadComments = createAsyncThunk(
  "app/asyncLoadComments",
  async (info) => {
    const { subReddit, id } = info;
    const res = await fetch(
      `https://www.reddit.com/r/${subReddit}/comments/${id}.json`
    );
    const json = await res.json();
    const comments = json[1].data.children.map((child) => child.data);
    return { comments, id };
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    logPosts: (state, action) => {
      state.posts = [...action.payload];
    },
    setSubReddit: (state, action) => {
      state.subReddit = action.payload;
    },
    resetComments: (state, action) => {
      const newPosts = state.posts.map((post) => {
        if (post.id === action.payload) {
          post.comments = [];
        }
        return post;
      });
      state.posts = newPosts;
    },
    setTerm: (state, action) => {
      state.term = action.payload;
    },
    setStaticTerm: (state) => {
      state.staticTerm = state.term;
    },
    setFilteredPost: (state, action) => {
      if (action.payload === "reset") {
        state.filteredPost = [];
        return;
      }

      const filteredArray = current(state.posts).filter((post) =>
        post.title.includes(state.term)
      );

      if (filteredArray.length === 0) {
        state.noMatches = true;
        return;
      }

      state.filteredPost = filteredArray;
    },
    resetNoMatches: (state) => {
      state.noMatches = false;
    },
  },
  extraReducers: {
    [asyncLoadPosts.pending]: (state) => {
      state.isLoadingPosts = true;
      state.hasErrorPosts = false;
    },
    [asyncLoadPosts.fulfilled]: (state, action) => {
      state.isLoadingPosts = false;
      state.hasErrorPosts = false;
      state.posts = action.payload;
    },
    [asyncLoadPosts.rejected]: (state) => {
      state.isLoadingPosts = false;
      state.hasErrorPosts = true;
    },
    [asyncLoadComments.pending]: (state) => {
      state.isLoadingComments = true;
      state.hasErrorComments = false;
    },
    [asyncLoadComments.fulfilled]: (state, action) => {
      state.isLoadingComments = false;
      state.hasErrorComments = false;
      const newPosts = state.posts.map((post) => {
        if (post.id === action.payload.id) {
          post.comments = action.payload.comments;
        }
        return post;
      });
      state.posts = newPosts;
    },
    [asyncLoadComments.rejected]: (state) => {
      state.isLoadingComments = false;
      state.hasErrorComments = true;
    },
  },
});

export const selectPosts = ({ app }) => app.posts;
export const selectSubReddit = ({ app }) => app.subReddit;
export const selectTerm = ({ app }) => app.term;
export const selectStaticTerm = ({ app }) => app.staticTerm;
export const selectFilteredPost = ({ app }) => app.filteredPost;
export const selectNoMatches = ({ app }) => app.noMatches;
export const selectIsLoadingPosts = ({ app }) => app.isLoadingPosts;
export const selectIsLoadingComments = ({ app }) => app.isLoadingComments;

export const {
  logPosts,
  setSubReddit,
  resetComments,
  setTerm,
  setStaticTerm,
  setFilteredPost,
  resetNoMatches,
} = appSlice.actions;

export default appSlice.reducer;
