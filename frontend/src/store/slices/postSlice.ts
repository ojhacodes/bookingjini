import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Post {
    id: string;
    title: string;
    occasion: string;
    content: string;
    platforms: string[];
    scheduledTime: string;
    status: 'draft' | 'scheduled' | 'published' | 'failed';
    createdAt: string;
    updatedAt: string;
}

interface PostState {
    posts: Post[];
    loading: boolean;
    error: string | null;
}

interface CreatePostData {
    title: string;
    occasion: string;
    content: string;
    platforms: string[];
    scheduledTime: Date;
}

const initialState: PostState = {
    posts: [],
    loading: false,
    error: null,
};

export const createPost = createAsyncThunk(
    'posts/createPost',
    async (postData: CreatePostData) => {
        const response = await axios.post('/api/posts', postData);
        return response.data;
    }
);

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
    const response = await axios.get('/api/posts');
    return response.data;
});

export const getPost = createAsyncThunk(
    'posts/getPost',
    async (id: string) => {
        const response = await axios.get(`/api/posts/${id}`);
        return response.data;
    }
);

export const updatePost = createAsyncThunk(
    'posts/updatePost',
    async ({ id, data }: { id: string; data: Partial<CreatePostData> }) => {
        const response = await axios.put(`/api/posts/${id}`, data);
        return response.data;
    }
);

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async (id: string) => {
        await axios.delete(`/api/posts/${id}`);
        return id;
    }
);

export const publishPost = createAsyncThunk(
    'posts/publishPost',
    async (id: string) => {
        const response = await axios.post(`/api/posts/${id}/publish`);
        return response.data;
    }
);

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Create Post
            .addCase(createPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
                state.loading = false;
                state.posts.unshift(action.payload);
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to create post';
            })
            // Get Posts
            .addCase(getPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch posts';
            })
            // Get Post
            .addCase(getPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPost.fulfilled, (state, action: PayloadAction<Post>) => {
                state.loading = false;
                const index = state.posts.findIndex((post) => post.id === action.payload.id);
                if (index !== -1) {
                    state.posts[index] = action.payload;
                } else {
                    state.posts.push(action.payload);
                }
            })
            .addCase(getPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch post';
            })
            // Update Post
            .addCase(updatePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
                state.loading = false;
                const index = state.posts.findIndex((post) => post.id === action.payload.id);
                if (index !== -1) {
                    state.posts[index] = action.payload;
                }
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update post';
            })
            // Delete Post
            .addCase(deletePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.posts = state.posts.filter((post) => post.id !== action.payload);
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete post';
            })
            // Publish Post
            .addCase(publishPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(publishPost.fulfilled, (state, action: PayloadAction<Post>) => {
                state.loading = false;
                const index = state.posts.findIndex((post) => post.id === action.payload.id);
                if (index !== -1) {
                    state.posts[index] = action.payload;
                }
            })
            .addCase(publishPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to publish post';
            });
    },
});

export const { clearError } = postSlice.actions;
export default postSlice.reducer;
