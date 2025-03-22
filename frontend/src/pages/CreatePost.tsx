import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    FormControlLabel,
    Checkbox,
    SelectChangeEvent,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createPost } from '../store/slices/postSlice';

const platforms = [
    { value: 'facebook', label: 'Facebook' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'linkedin', label: 'LinkedIn' },
];

const occasions = [
    { value: 'general', label: 'General' },
    { value: 'promotion', label: 'Promotion' },
    { value: 'event', label: 'Event' },
    { value: 'announcement', label: 'Announcement' },
];

const CreatePost: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState({
        title: '',
        occasion: 'general',
        content: '',
        platforms: [] as string[],
        scheduledTime: new Date(),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePlatformChange = (platform: string) => {
        setFormData((prev) => ({
            ...prev,
            platforms: prev.platforms.includes(platform)
                ? prev.platforms.filter((p) => p !== platform)
                : [...prev.platforms, platform],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(createPost(formData)).unwrap();
            navigate('/');
        } catch (error) {
            console.error('Failed to create post:', error);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Create New Post
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel>Occasion</InputLabel>
                                <Select
                                    name="occasion"
                                    value={formData.occasion}
                                    onChange={handleSelectChange}
                                    label="Occasion"
                                >
                                    {occasions.map((occasion) => (
                                        <MenuItem key={occasion.value} value={occasion.value}>
                                            {occasion.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    label="Schedule Time"
                                    value={formData.scheduledTime}
                                    onChange={(newValue) => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            scheduledTime: newValue || new Date(),
                                        }));
                                    }}
                                    slotProps={{ textField: { fullWidth: true } }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Content"
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" gutterBottom>
                                Platforms
                            </Typography>
                            <Grid container spacing={2}>
                                {platforms.map((platform) => (
                                    <Grid item key={platform.value}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={formData.platforms.includes(platform.value)}
                                                    onChange={() => handlePlatformChange(platform.value)}
                                                />
                                            }
                                            label={platform.label}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={formData.platforms.length === 0}
                            >
                                Create Post
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default CreatePost; 