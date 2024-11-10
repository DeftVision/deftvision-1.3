import {
    Box,
    Table,
    TableHead,
    TableContainer,
    TableBody,
    TableRow,
    TableCell,
    TableSortLabel,
    TablePagination,
    Paper,
    OutlinedInput, InputAdornment, FormControl
} from '@mui/material'
import { Search, CheckCircleOutline, DoNotDisturbOnOutlined  } from '@mui/icons-material'
import {useState, useEffect} from 'react';
import { useTheme } from '@mui/material/styles'



export default function UserData() {
    const theme = useTheme();
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [searchQuery, setSearchQuery] = useState('')
    const [sortConfig, setSortConfig] = useState({key: 'firstName', direction: 'asc'});


    async function getUsers() {
        try {
            const response = await fetch('http://localhost:7000/api/user/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const _response = await response.json();

            if (response.ok && _response.users) {
                setUsers(_response.users)

            } else {
                console.error('Failed to fetch announcements');
            }
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    const handleToggleStatus = async (userId, currentStatus) => {
        try {
            const response = await fetch (`http://localhost:7000/api/user/toggle-status/${userId}`, {
                method: 'PATCH',
                body: JSON.stringify({ isActive: !currentStatus }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                setUsers((prev) =>
                    prev.map((user) =>
                        user._id === userId
                            ? { ...user, isActive: !currentStatus }
                            : user
                    )
                )
            } else {
                console.log('Failed to update user status')
            }
        } catch (error) {
            console.error('Error toggling user status:', error);
        }
    }

    const handleSearch = (e) => {
        setSearchQuery(e.target.value)
    }

    const handleSort = (key) => {
        setSortConfig((prevSortConfig) => ({
            key,
            direction: prevSortConfig.key === key && prevSortConfig.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const sortedUsers = [...users].sort((a, b) => {
        if (sortConfig.direction === 'asc') {
            return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1
        }
        return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1
    })

    const filteredUsers = sortedUsers.filter((user) => {
        return user.firstName.toLowerCase().includes(searchQuery.toLowerCase())
    })

    const displayedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    }


    const handleChangeRowsPerPage = (e) => {
        const value = +e.target.value || 5;
        setRowsPerPage(value)
        setPage(0);
    }


    return (
        <Box width='100%' sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: 4}}>
            <Paper elevation={16} width='100%' sx={{padding: 5, maxWidth: '1200px', width: '90%'}}>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    marginBottom: 2
                }}>
                    <FormControl sx={{m: 1}}>
                        <OutlinedInput
                            id='outlined-adornment-search'
                            startAdornment={<InputAdornment position='start'><Search /></InputAdornment>}
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </FormControl>

                </Box>

                <TableContainer sx={{justifyContent: 'center', alignItems: 'center'}}>
                    <Table sx={{minWidth: 700}} stickyHeader aria-label='user data table grid'>
                        <TableHead sx={{justifyContent: 'center'}}>
                            <TableRow>
                                <TableCell sx={{textAlign: 'center'}}>
                                    <TableSortLabel
                                        active={sortConfig.key === 'firstName'}
                                        direction={sortConfig.direction}
                                        onClick={() => handleSort('firstName')}
                                    >
                                        name
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{textAlign: 'center'}}>
                                    <TableSortLabel
                                        active={sortConfig.key === 'location'}
                                        direction={sortConfig.direction}
                                        onClick={() => handleSort('location')}
                                    >
                                        location
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{textAlign: 'center'}}>
                                    <TableSortLabel
                                        active={sortConfig.key === 'role'}
                                        direction={sortConfig.direction}
                                        onClick={() => handleSort('role')}
                                    >
                                        role
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{textAlign: 'center'}}>
                                    <TableSortLabel
                                        active={sortConfig.key === 'isActive'}
                                        direction={sortConfig.direction}
                                        onClick={() => handleSort('isActive')}
                                    >
                                        status
                                    </TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {displayedUsers.map((user) => (
                                <TableRow
                                    key={user._id}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: theme.palette.action.hover,
                                            color: theme.palette.mode === 'dark' ? '#000' : '#fff',
                                            cursor: 'default'
                                        }
                                    }}
                                >
                                    <TableCell sx={{textAlign: 'center' }}>{user.firstName}</TableCell>
                                    <TableCell sx={{textAlign: 'center' }}>{user.location}</TableCell>
                                    <TableCell sx={{textAlign: 'center' }}>{user.role}</TableCell>
                                    <TableCell sx={{textAlign: 'center' }}>
                                        {user.isActive ? (
                                            <CheckCircleOutline
                                                onClick={() => handleToggleStatus(user._id, user.isActive)}
                                                sx={{ cursor: 'pointer', color: '#1976d2'}}
                                            />
                                        ) : (
                                            <DoNotDisturbOnOutlined
                                                onClick={() => handleToggleStatus(user._id, user.isActive)}
                                                sx={{ cursor: 'pointer', color: '#aaa'}}
                                            />
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component='div'
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}