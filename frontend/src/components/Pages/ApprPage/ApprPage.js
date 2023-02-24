import {
  Layout,
  Row,
  Button,
  Table,
  Typography,
  message,
  Popconfirm
} from 'antd'
import { useState, useEffect } from 'react'
import './ApprPage.css'
import { CheckOutlined } from '@ant-design/icons'
import api from '../../../api'

import Navbar from '../../Navbar/Navbar'

export const PayPage = () => {
  const { Content, Footer } = Layout

  const { Title } = Typography

  const [claimsAppData, setClaimsAppData] = useState([])

  const [leavesAppData, setleavesAppData] = useState([])

  const refreshappclaims = () =>
    fetch(api.API_URL + 'claims/approver', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: 'Pending', approver: sessionStorage.user })
    })
      .then(response => response.json())
      .then(data => {
        setClaimsAppData(data)
      })

  const refreshappleaves = () =>
    fetch(api.API_URL + 'leaves/approver', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: 'Pending', approver: sessionStorage.user })
    })
      .then(response => response.json())
      .then(data => {
        setleavesAppData(data)
      })

  const updateappclaims = value =>
    fetch(api.API_URL + 'claims/status', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: 'Approved', claimsid: value })
    })
      .then(response => response.json())
      .then(result => {
        message.success(result)
        refreshappclaims()
      })

  const updateappleaves = value =>
    fetch(api.API_URL + 'leaves/status', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: 'Approved', leaveid: value })
    })
      .then(response => response.json())
      .then(result => {
        message.success(result)
        refreshappleaves()
      })

  useEffect(() => {
    refreshappclaims()
    refreshappleaves()
  }, [])

  const claimsColumns = [
    {
      title: 'Claims ID',
      dataIndex: 'claimsid',
      key: 'claimsid',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.claimsid - b.claimsid,
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
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      key: 'remarks'
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_, record) => (
        <Popconfirm
          title='Sure to approve?'
          onConfirm={() => updateappclaims(record.claimsid)}
        >
          <Button icon={<CheckOutlined />} />
        </Popconfirm>
      )
    }
  ]

  const leaveColumns = [
    {
      title: 'Leaves ID',
      dataIndex: 'leaveid',
      key: 'leaveid',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.leaveid - b.leaveid,
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
      title: 'Remarks',
      dataIndex: 'remarks',
      key: 'remarks'
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_, record) => (
        <Popconfirm
          title='Sure to approve?'
          onConfirm={() => updateappleaves(record.leaveid)}
        >
          <Button icon={<CheckOutlined />} />
        </Popconfirm>
      )
    }
  ]

  return (
    <Layout>
      <Navbar name='approver' />
      <Content className='pay'>
        <Row>
          <Title>Approvals</Title>
        </Row>

        <Table
          rowSelection
          dataSource={claimsAppData}
          columns={claimsColumns}
          pagination={false}
          scroll={{ y: 350 }}
        />
        <Table
          rowSelection
          dataSource={leavesAppData}
          columns={leaveColumns}
          pagination={false}
          scroll={{ y: 350 }}
        />
      </Content>
      <Footer style={{ textAlign: 'center' }}>Team 08</Footer>
    </Layout>
  )
}

export default PayPage
