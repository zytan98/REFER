import {
  Layout,
  Button,
  Checkbox,
  Form,
  Input,
  Image,
  Row,
  Typography,
  Col,
  message
} from 'antd'
import './LoginPage.css'
import logo from '../../../Assets/logo.png'
import api from '../../../api'
import { useNavigate } from 'react-router-dom'

export const LoginPage = props => {
  const { Content, Footer } = Layout

  const { Title } = Typography

  const navigate = useNavigate()

  const loginAuth = values => {
    fetch(api.API_URL + 'login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: values.username })
    })
      .then(response => response.json())
      .then(
        result => {
          if (
            result[0]?.password !== undefined &&
            result[0].password === values.password
          ) {
            sessionStorage.setItem('user', values.username)
            sessionStorage.setItem('approver', result[0].approver)
            sessionStorage.setItem('TimeCheck', new Date().toLocaleTimeString())
            sessionStorage.setItem('PageCount',"1")
            navigate('/main', { replace: true })
          } else {
            message.error('Wrong Username/Password')
          }
        },
        error => {
          message.error('Wrong Username/Password')
        }
      )
  }

  const onFinish = values => {
    loginAuth(values)
  }

  return (
    <Layout>
      <Content style={{ height: '100vh' }}>
        <Row
          type='flex'
          justify='center'
          align='middle'
          style={{ minHeight: '100vh' }}
          so
        >
          <Col span={8}>
            <Form
              style={{
                backgroundColor: '#fff',
                border: ' 2px solid hsl(0, 1%, 74%)',
                borderRadius: '25px'
              }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete='off'
            >
              <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
                <Image
                  src={logo}
                  preview={false}
                  height={80}
                  width={200}
                ></Image>
                <Title>Log in</Title>
              </Form.Item>
              <Form.Item
                wrapperCol={{ offset: 2, span: 20 }}
                name='username'
                rules={[
                  { required: true, message: 'Please input your username!' }
                ]}
              >
                <Input placeholder='Username' />
              </Form.Item>

              <Form.Item
                wrapperCol={{ offset: 2, span: 20 }}
                name='password'
                rules={[
                  { required: true, message: 'Please input your password!' }
                ]}
              >
                <Input.Password placeholder='Password' />
              </Form.Item>

              <Form.Item
                name='remember'
                valuePropName='checked'
                wrapperCol={{ offset: 9, span: 16 }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
                <Button type='primary' htmlType='submit'>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Team 08</Footer>
    </Layout>
  )
}

export default LoginPage
