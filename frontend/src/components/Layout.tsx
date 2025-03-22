import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAppSelector } from '../store/hooks';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { isSidebarOpen } = useAppSelector((state) => state.ui);

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <CssBaseline />
            <Navbar />
            <Sidebar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${isSidebarOpen ? 240 : 0}px)` },
                    ml: { sm: `${isSidebarOpen ? 240 : 0}px` },
                    transition: 'margin 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default Layout; 