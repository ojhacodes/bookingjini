import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
    id: string;
    name: string;
    email: string;
    hotelName: string;
    notifications: {
        email: boolean;
        push: boolean;
        postReminders: boolean;
        analytics: boolean;
    };
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

interface LoginData {
    email: string;
    password: string;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
    hotelName: string;
}

interface UpdateProfileData {
    name: string;
    email: string;
    hotelName: string;
    notifications: {
        email: boolean;
        push: boolean;
        postReminders: boolean;
        analytics: boolean;
    };
}

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: false,
    error: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async (data: LoginData) => {
        const response = await axios.post('/api/auth/login', data);
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        return { token, user };
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (data: RegisterData) => {
        const response = await axios.post('/api/auth/register', data);
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        return { token, user };
    }
);

export const getProfile = createAsyncThunk('auth/getProfile', async () => {
    const response = await axios.get('/api/auth/profile');
    return response.data;
});

export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async (data: UpdateProfileData) => {
        const response = await axios.put('/api/auth/profile', data);
        return response.data;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Login failed';
            })
            // Register
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Registration failed';
            })
            // Get Profile
            .addCase(getProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch profile';
            })
            // Update Profile
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update profile';
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer; 