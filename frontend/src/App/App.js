import './App.css'
import { Route, Routes} from 'react-router-dom'
import LoginPage from '../components/Pages/LoginPage/LoginPage'
import LandingPage from '../components/Pages/LandingPage/LandingPage'
import { lazy} from 'react'

//const LandingPage = lazy(() => import('../components/Pages/LandingPage/LandingPage'))
const ClaimPage = lazy(() => import('../components/Pages/ClaimPage/ClaimPage'))
const LeavePage = lazy(() => import('../components/Pages/LeavePage/LeavePage'))
const PayPage = lazy(() => import('../components/Pages/PayPage/PayPage'))
const ApprPage = lazy(() => import('../components/Pages/ApprPage/ApprPage'))

function App () {
  

  return (
    <div>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/main' element={<LandingPage />} />
          <Route path='/payslip' element={<PayPage />} />
          <Route path='/claim' element={<ClaimPage />} />
          <Route path='/leave' element={<LeavePage />} /> 
          <Route path='/approver' element={<ApprPage />} />
        </Routes>
    </div>
  )
}

export default App
