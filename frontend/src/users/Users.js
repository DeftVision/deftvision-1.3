import { Box, Stack } from '@mui/material';


import UserData from './UserData'
import UserForm from './UserForm'

export default function Users() {

    return (
        <Box>
            <Stack direction='column' spacing={5}>
                <UserForm />
                <UserData />
            </Stack>
        </Box>
    );
}