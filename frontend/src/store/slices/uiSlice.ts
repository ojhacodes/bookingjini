import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
    isSidebarOpen: boolean;
    theme: 'light' | 'dark';
    snackbar: {
        open: boolean;
        message: string;
        severity: 'success' | 'error' | 'info' | 'warning';
    };
}

const initialState: UIState = {
    isSidebarOpen: true,
    theme: 'light',
    snackbar: {
        open: false,
        message: '',
        severity: 'info',
    },
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.theme = action.payload;
        },
        showSnackbar: (
            state,
            action: PayloadAction<{
                message: string;
                severity: 'success' | 'error' | 'info' | 'warning';
            }>
        ) => {
            state.snackbar = {
                open: true,
                message: action.payload.message,
                severity: action.payload.severity,
            };
        },
        hideSnackbar: (state) => {
            state.snackbar.open = false;
        },
    },
});

export const { toggleSidebar, setTheme, showSnackbar, hideSnackbar } =
    uiSlice.actions;
export default uiSlice.reducer; 