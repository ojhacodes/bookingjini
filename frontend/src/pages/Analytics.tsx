import React from 'react';
import {
    Box,
    Paper,
    Typography,
    Grid,
    Card,
    CardContent,
    LinearProgress,
} from '@mui/material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const mockData = {
    totalPosts: 150,
    publishedPosts: 120,
    scheduledPosts: 30,
    engagementRate: 4.5,
    platformStats: [
        { name: 'Facebook', posts: 45, engagement: 3.2 },
        { name: 'Instagram', posts: 35, engagement: 5.8 },
        { name: 'Twitter', posts: 25, engagement: 2.1 },
        { name: 'LinkedIn', posts: 15, engagement: 4.3 },
    ],
    occasionStats: [
        { name: 'General', count: 50 },
        { name: 'Promotion', count: 40 },
        { name: 'Event', count: 30 },
        { name: 'Announcement', count: 30 },
    ],
};

const Analytics: React.FC = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Analytics Dashboard
            </Typography>

            <Grid container spacing={3}>
                {/* Summary Cards */}
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Total Posts
                            </Typography>
                            <Typography variant="h4">{mockData.totalPosts}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Published Posts
                            </Typography>
                            <Typography variant="h4">{mockData.publishedPosts}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Scheduled Posts
                            </Typography>
                            <Typography variant="h4">{mockData.scheduledPosts}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Engagement Rate
                            </Typography>
                            <Typography variant="h4">{mockData.engagementRate}%</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Platform Performance Chart */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Platform Performance
                        </Typography>
                        <Box sx={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={mockData.platformStats}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="posts" fill="#8884d8" name="Posts" />
                                    <Bar dataKey="engagement" fill="#82ca9d" name="Engagement Rate" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>
                    </Paper>
                </Grid>

                {/* Occasion Distribution Chart */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Post Distribution by Occasion
                        </Typography>
                        <Box sx={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={mockData.occasionStats}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="count" fill="#8884d8" name="Number of Posts" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>
                    </Paper>
                </Grid>

                {/* Platform Progress Bars */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Platform Engagement Progress
                        </Typography>
                        {mockData.platformStats.map((platform) => (
                            <Box key={platform.name} sx={{ mb: 2 }}>
                                <Typography variant="body2" gutterBottom>
                                    {platform.name}
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={(platform.engagement / 10) * 100}
                                    sx={{ height: 10, borderRadius: 5 }}
                                />
                            </Box>
                        ))}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Analytics; 