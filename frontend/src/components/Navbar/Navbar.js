import { Menu, Button, Layout } from 'antd'

import { LogoutOutlined } from '@ant-design/icons'

import logo from '../../Assets/logo.png'

import { Link } from 'react-router-dom'

import './Navbar.css'

import { useNavigate } from 'react-router-dom'

export const Navbar = props => {
  const { Header } = Layout

  const navigate = useNavigate()

  const approver = JSON.parse(sessionStorage.approver)

  const addPageCount = () => {
    var PageCount =Number(sessionStorage.getItem('PageCount'))
    sessionStorage.setItem('PageCount', ++PageCount)
  }

  return (
    <Header>
      <img className='logo' src={logo} alt='' />
      <Button
        className='avatar'
        icon={<LogoutOutlined />}
        style={{ background: '#c4c4c4' }}
        onClick={() => {
          sessionStorage.removeItem('user')
          sessionStorage.removeItem('checked')
          sessionStorage.removeItem('approver')
          sessionStorage.removeItem('TimeCheck')
          sessionStorage.removeItem('finished')
          sessionStorage.removeItem('PageCount')
          navigate('/', { replace: true })
        }}
      >
        Log Out
      </Button>
      <div
        style={{
          float: 'right',
          marginRight: 10,
          color: '#fff',
          fontWeight: 700
        }}
      >
        WELCOME {sessionStorage.user}
      </div>
      <Menu
        theme='dark'
        mode='horizontal'
        defaultSelectedKeys={[props.name]}
        onClick={addPageCount}
      >
        <Menu.Item className='items' key='main'>
          <Link to='/main'>Home</Link>
        </Menu.Item>
        <Menu.Item className='items' key='leave'>
          <Link to='/leave'>Leaves</Link>
        </Menu.Item>
        <Menu.Item className='items' key='claim'>
          <Link to='/claim'>Claims</Link>
        </Menu.Item>
        <Menu.Item className='items' key='payslip'>
          <Link to='/payslip'>Payslip</Link>
        </Menu.Item>
        {approver && (
          <Menu.Item className='items' key='approver'>
            <Link to='/approver'>Approver</Link>
          </Menu.Item>
        )}
      </Menu>
    </Header>
  )
}

export default Navbar
