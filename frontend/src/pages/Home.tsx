import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { useAppSelector } from '../store/hooks';

const Home: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Welcome, {user?.hotelName || 'Hotel Owner'}!
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Quick Actions
                        </Typography>
                        <Typography variant="body1">
                            Create a new post, view analytics, or manage your social media accounts.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Recent Posts
                        </Typography>
                        <Typography variant="body1">
                            No recent posts. Create your first post to get started!
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home; 