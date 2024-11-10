import { Box, Button,  FormControl, FormControlLabel, InputLabel, MenuItem, Paper, Select, Stack, Switch, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import roles from '../utility/RoleItems'
import locations from "../utility/LocationItems";


const form_default = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    location: '',
    role: '',
    isActive: true,
}

export default function UserForm() {
    const [formData, setFormData] = useState(form_default);

    const handleFieldChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:7000/api/user/new', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const _response = await response.json();
            console.log(_response)
            if(response.ok) {
            } else {
                console.log('error saving user')
            }
            console.log(formData)

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Box width='100%' sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: 4}}>
            <Paper elevation={16} width='100%' sx={{padding: 5, maxWidth: '1200px', width: '90%'}}>
                <Box component='form' onSubmit={handleSubmit} sx={{width: '75%', justifyContent: 'center'}}>
                    <Stack direction='column' spacing={2}>
                        <TextField
                            type='text'
                            name='firstName'
                            label='first name'
                            value={formData.firstName}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    firstName: e.target.value
                                })
                            }}
                        />

                        <TextField
                            type='text'
                            name='lastName'
                            label='last name'
                            value={formData.lastName}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    lastName: e.target.value
                                })
                            }}
                        />

                        <TextField
                            type='email'
                            name='email'
                            label='email'
                            value={formData.email}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    email: e.target.value
                                })
                            }}
                        />

                        <TextField
                            type='password'
                            name='password'
                            label='password'
                            value={formData.password}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    password: e.target.value
                                })
                            }}
                        />

                        <FormControl>
                            <InputLabel>role</InputLabel>
                            <Select
                                name='role'
                                variant='outlined'
                                label='role'
                                value={formData.role || ''}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        role: e.target.value
                                    })
                                }}
                                sx={{ textAlign: 'start' }}
                            >
                                {roles.map((role) => (
                                    <MenuItem key={role} value={role}>
                                        {role}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl>
                            <InputLabel>location</InputLabel>
                            <Select
                                name='location'
                                variant='outlined'
                                label='location'
                                value={formData.location || ''}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        location: e.target.value
                                    })
                                }}
                                sx={{ textAlign: 'start' }}
                            >
                                {locations.map((location) => (
                                    <MenuItem key={location} value={location}>
                                        {location}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControlLabel

                            control={
                                <Switch
                                    name='isActive'
                                    id='isActive'
                                    value={formData.isActive}
                                    onChange={handleFieldChange}
                                    checked={formData.isActive}
                                />}
                            label='is active'
                        />
                    </Stack>
                    <Stack direction='row' spacing={2} sx={{justifyContent: 'center', alignItems: 'center'}}>
                        <Button variant='outlined'>cancel</Button>
                        <Button variant='outlined' type='submit'>save</Button>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
}