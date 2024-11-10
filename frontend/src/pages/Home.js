import { Box, Typography } from '@mui/material'

export default function Home() {

    return (
        <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            <Typography variant='overline' sx={{fontSize: '1rem'}}>Home</Typography>
        </Box>
    );
}