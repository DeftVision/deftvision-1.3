import { Box } from '@mui/material'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { AuthProvider } from './utility/AuthContext';
import Navbar from './components/Navbar'

import { Home, Error, Login } from './pages/index'
import Users from './users/Users'



function App() {
  return (
      <AuthProvider>
        <Router>
          <Box>
            <Navbar/>
            <Box width='100%' sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: 10}}>
              <div className="App" style={{width: '100%'}}>
                <Routes>
                  <Route path='/' element={<Home/>}/>
                  <Route path='*' element={<Error/>}/>
                  <Route path='/login' element={<Login/>}/>
                  <Route path='/users' element={<Users/>}/>
                </Routes>
              </div>
            </Box>
          </Box>
        </Router>
      </AuthProvider>

  );
}

export default App;