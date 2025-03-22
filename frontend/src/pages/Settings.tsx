import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    Box,
    Paper,
    Typography,
    Grid,
    TextField,
    Button,
    Switch,
    FormControlLabel,
    Divider,
    Alert,
} from '@mui/material';
import { updateProfile } from '../store/slices/authSlice';

const Settings: React.FC = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        hotelName: user?.hotelName || '',
        notifications: {
            email: true,
            push: true,
            postReminders: true,
            analytics: true,
        },
    });
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;
        if (name.startsWith('notifications.')) {
            const notificationKey = name.split('.')[1];
            setFormData((prev) => ({
                ...prev,
                notifications: {
                    ...prev.notifications,
                    [notificationKey]: checked,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(updateProfile(formData)).unwrap();
            setMessage({ type: 'success', text: 'Settings updated successfully!' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update settings. Please try again.' });
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Settings
            </Typography>

            {message && (
                <Alert severity={message.type} sx={{ mb: 2 }}>
                    {message.text}
                </Alert>
            )}

            <Paper sx={{ p: 3 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        {/* Profile Information */}
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Profile Information
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Hotel Name"
                                name="hotelName"
                                value={formData.hotelName}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Divider sx={{ my: 2 }} />
                        </Grid>

                        {/* Notification Settings */}
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Notification Settings
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.notifications.email}
                                        onChange={handleChange}
                                        name="notifications.email"
                                    />
                                }
                                label="Email Notifications"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.notifications.push}
                                        onChange={handleChange}
                                        name="notifications.push"
                                    />
                                }
                                label="Push Notifications"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.notifications.postReminders}
                                        onChange={handleChange}
                                        name="notifications.postReminders"
                                    />
                                }
                                label="Post Reminders"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.notifications.analytics}
                                        onChange={handleChange}
                                        name="notifications.analytics"
                                    />
                                }
                                label="Analytics Reports"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Divider sx={{ my: 2 }} />
                        </Grid>

                        {/* Submit Button */}
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                            >
                                Save Changes
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default Settings; 