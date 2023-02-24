import { useState, useEffect } from 'react'
import { Layout, Col, Row, Button, Modal, Card, Table, Checkbox } from 'antd'
import './LandingPage.css'
import { PlusOutlined, EyeOutlined } from '@ant-design/icons'
import GridLayout from 'react-grid-layout'
import Navbar from '../../Navbar/Navbar'
import ClaimModal from '../../Modals/ClaimModal/ClaimModal'
import LeaveModal from '../../Modals/LeaveModal/LeaveModal'
import Clock from '../../Extras/Clock/Clock'
import api from '../../../api'
import PayModal from '../../Modals/PayModal/PayModal'

export const LandingPage = () => {

  const { Content, Footer } = Layout

  const [isModulesVisible, setisModulesVisible] = useState(false)

  const [isClaimVisible, setisClaimVisible] = useState(false)

  const [isLeaveVisible, setisLeaveVisible] = useState(false)

  const [isCheckIn, setisCheckIn] = useState(false)

  const [claimsData, setClaimsData] = useState([])

  const [leavesData, setleavesData] = useState([])

  const [paysData, setPaysData] = useState([])

  const [pdfPath, setpdfPath] = useState()

  const [pdfPass, setpdfPass] = useState()

  const [isPayVisible, setisPayVisible] = useState(false)

  if (!sessionStorage.getItem('checked')) {
    sessionStorage.setItem(
      'checked',
      JSON.stringify(['check', 'claim', 'leave'])
    )
  }

  const checkData = JSON.parse(sessionStorage.checked)

  const refreshclaims = () =>
    fetch(api.API_URL + 'claims/list', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ employeename: sessionStorage.user })
    })
      .then(response => response.json())
      .then(data => {
        setClaimsData(data)
      })

  const refreshleaves = () =>
    fetch(api.API_URL + 'leaves/list', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ employeename: sessionStorage.user })
    })
      .then(response => response.json())
      .then(data => {
        setleavesData(data)
      })

  const refreshpay = () =>
    fetch(api.API_URL + 'payslips')
      .then(response => response.json())
      .then(data => {
        setPaysData(data)
      })

  useEffect(() => {
    refreshclaims()
    refreshleaves()
    refreshpay()
  }, [])

  const toggleCheck = () => setisCheckIn(value => !value)

  const boardCheck = values => {
    sessionStorage.setItem('checked', JSON.stringify(values))
  }

  const options = [
    { label: 'Check in/out', value: 'check' },
    { label: 'Claims', value: 'claim' },
    { label: 'Leaves', value: 'leave' },
    { label: 'Payslips', value: 'payslip' }
  ]

  const claimsColumns = [
    {
      title: 'Claims ID',
      dataIndex: 'claimsid',
      key: 'claimsid',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.claimsid - b.claimsid
    },
    {
      title: 'Approver',
      dataIndex: 'approver',
      key: 'approver'
    },
    {
      title: 'Claims Type',
      dataIndex: 'claimstype',
      key: 'claimstype'
    },
    {
      title: 'Claims Amount',
      dataIndex: 'claimsamount',
      key: 'claimsamount'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: 'Submission Date',
      dataIndex: 'submissiondate',
      key: 'submissiondate',
      render: value => {
        return new Date(value).toLocaleDateString('en-GB')
      }
    }
  ]

  const leaveColumns = [
    {
      title: 'Leaves ID',
      dataIndex: 'leaveid',
      key: 'leaveid',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.leaveid - b.leaveid
    },
    {
      title: 'Leaves Type',
      dataIndex: 'leavetype',
      key: 'leavetype'
    },
    {
      title: 'Start Date',
      dataIndex: 'datefrom',
      key: 'datefrom',
      render: value => {
        return new Date(value).toLocaleDateString('en-GB')
      }
    },
    {
      title: 'End Date',
      dataIndex: 'dateto',
      key: 'dateto',
      render: value => {
        return new Date(value).toLocaleDateString('en-GB')
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
      
    },
    {
      title: 'Approver',
      dataIndex: 'approver',
      key: 'approver'
    }
  ]

  const payColumns = [
    {
      title: 'PaySlip Reference',
      dataIndex: 'payslipreference',
      key: 'payslipreference'
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
      render: (_, record) => {
        return new Date(record.datefrom).toLocaleDateString('en-GB', {
          year: 'numeric'
        })
      }
    },
    {
      title: 'Month',
      dataIndex: 'month',
      key: 'month',
      render: (_, record) => {
        return new Date(record.datefrom).toLocaleDateString('en-GB', {
          month: 'long'
        })
      }
    },
    {
      title: 'Date From',
      dataIndex: 'datefrom',
      key: 'datefrom',
      render: (value, row, index) => {
        return new Date(value).toLocaleDateString('en-GB')
      }
    },
    {
      title: 'Date To',
      dataIndex: 'dateto',
      key: 'dateto',
      render: (value, row, index) => {
        return new Date(value).toLocaleDateString('en-GB')
      }
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_, record) => (
        <Button
          onClick={() => {
            setisPayVisible(true)
            setpdfPath(record.pdf)
            setpdfPass(record.passcode)
          }}
          icon={<EyeOutlined />}
        ></Button>
      )
    }
  ]

  return (
    <Layout>
      <Navbar name='main' />
      <Content className='layout'>
        <GridLayout
          className='grid'
          cols={22}
          rowHeight={10}
          width={1500}
          isBounded={true}
        >
          {checkData.includes('check') && (
            <div
              className='card'
              key='check'
              data-grid={{ x: 0, y: 0, w: 11, h: 23, isResizable: false }}
            >
              <Card style={{ height: 'inherit' }} title='Check In/Out'>
                <Row>
                  <Col style={{ fontSize: 40 }}>Status:</Col>
                  <Col
                    style={{ fontSize: 40, marginLeft: 10, fontWeight: 700 }}
                  >
                    {isCheckIn ? 'Checked-In' : 'Checked-Out'}
                  </Col>
                </Row>
                <Row>
                  <Col style={{ fontSize: 40 }}>Current Time: </Col>
                  <Col>
                    <Clock />
                  </Col>
                </Row>
                <Row style={{ marginTop: 10 }}>
                  <Button
                    type='primary'
                    className='button'
                    onClick={toggleCheck}
                    size='large'
                  >
                    {' '}
                    {isCheckIn ? 'Check Out' : 'Check In'}
                  </Button>
                </Row>
              </Card>
            </div>
          )}
          {checkData.includes('claim') && (
            <div
              className='card'
              key='claim'
              data-grid={{ x: 11, y: 0, w: 11, h: 23, isResizable: false }}
            >
              <Card style={{ height: 'inherit' }} title='Claims'>
                <Table
                  dataSource={claimsData}
                  columns={claimsColumns}
                  pagination={false}
                  scroll={{ y: 240 }}
                />
                <Button
                  shape='circle'
                  type='primary'
                  className='button'
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setisClaimVisible(true)
                  }}
                  style={{ marginTop: 10 }}
                />
                <ClaimModal
                  isClaimVisible={isClaimVisible}
                  setisClaimVisible={setisClaimVisible}
                  refreshclaims={refreshclaims}
                />
              </Card>
            </div>
          )}
          {checkData.includes('leave') && (
            <div
              className='card'
              key='leave'
              data-grid={{ x: 0, y: 0, w: 11, h: 23, isResizable: false }}
            >
              <Card style={{ height: 'inherit' }} title='Leaves'>
                <Table
                  dataSource={leavesData}
                  columns={leaveColumns}
                  pagination={false}
                  scroll={{ y: 240 }}
                />
                <Button
                  shape='circle'
                  type='primary'
                  className='button'
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setisLeaveVisible(true)
                  }}
                  style={{ marginTop: 10 }}
                ></Button>
                <LeaveModal
                  isLeaveVisible={isLeaveVisible}
                  setisLeaveVisible={setisLeaveVisible}
                  refreshleaves={refreshleaves}
                />
              </Card>
            </div>
          )}
          {checkData.includes('payslip') && (
            <div
              className='card'
              key='payslip'
              data-grid={{ x: 11, y: 0, w: 11, h: 23, isResizable: false }}
            >
              <Card style={{ height: 'inherit' }} title='Payslips'>
                <Table
                  dataSource={paysData}
                  columns={payColumns}
                  pagination={false}
                  scroll={{ y: 240 }}
                />
                <PayModal
                  isPayVisible={isPayVisible}
                  setisPayVisible={setisPayVisible}
                  pdfPath={pdfPath}
                  setpdfPath={setpdfPath}
                  pdfPass={pdfPass}
                  setpdfPass={setpdfPass}
                />
              </Card>
            </div>
          )}
          <div
            className='card'
            key='add'
            data-grid={{ x: 11, y: 0, w: 11, h: 23, isResizable: false }}
          >
            <Card style={{ height: 'inherit' }}>
              <Row
                style={{
                  justifyContent: 'center',
                  marginTop: '100px',
                  fontSize: '35px'
                }}
              >
                <div>Add/Remove Modules</div>
              </Row>
              <Row
                style={{
                  justifyContent: 'center',
                  marginTop: '40px',
                  marginBottom: '150px'
                }}
              >
                <Button
                  size='large'
                  shape='circle'
                  type='primary'
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setisModulesVisible(true)
                  }}
                ></Button>
                <Modal
                  title='Add/Remove Modules'
                  visible={isModulesVisible}
                  okText='Confirm'
                  onOk={() => {
                    setisModulesVisible(false)
                  }}
                  onCancel={() => {
                    setisModulesVisible(false)
                  }}
                  cancelButtonProps={{ style: { display: 'none' } }}
                >
                  <Checkbox.Group
                    defaultValue={checkData}
                    options={options}
                    onChange={boardCheck}
                  />
                </Modal>
              </Row>
            </Card>
          </div>
        </GridLayout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Team 08</Footer>
    </Layout>
  )
}
export default LandingPage
