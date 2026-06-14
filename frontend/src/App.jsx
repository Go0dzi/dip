import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/Authorization/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import Layout from './layout/Layout'
import Attendances from './pages/Attendances'
import Login from './pages/authorization/LoginAuth'
import Groups from './pages/Groups'
import Main from './pages/Main'
import Students from './pages/Students'

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route
						path='/login'
						element={<Login />}
					/>

					<Route
						element={
							<ProtectedRoute>
								<Layout />
							</ProtectedRoute>
						}
					>
						<Route
							path='/'
							element={<Main />}
						/>
						<Route
							path='/students'
							element={<Students />}
						/>
						<Route
							path='/groups'
							element={<Groups />}
						/>
						<Route
							path='/attendances'
							element={<Attendances />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	)
}

export default App
