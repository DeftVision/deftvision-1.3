import { Box, Typography } from '@mui/material'

export default function Error() {

    return (
        <Box>
            <Typography variant='overline' sx={{fontSize: '1rem'}}>404: page not found</Typography>
        </Box>
    );
}