import { useState, useEffect } from 'react'
import { Layout, Row, Button, Table, message, Popconfirm } from 'antd'
import './ClaimPage.css'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { Pie } from '@ant-design/charts'
import Navbar from '../../Navbar/Navbar'
import ClaimModal from '../../Modals/ClaimModal/ClaimModal'
import api from '../../../api'

export const ClaimPage = () => {
  const { Content, Footer } = Layout

  const [isClaimVisible, setisClaimVisible] = useState(false)

  const [claimsData, setClaimsData] = useState([])

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

  useEffect(() => {
    refreshclaims()
  }, [])

  const deleteClaims = value => {
    fetch(api.API_URL + 'claims', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ claimsid: value })
    })
      .then(res => res.json())
      .then(result => {
        message.success(result)
        refreshclaims()
      })
  }

  const data = [
    {
      type: 'Medical',
      value: 27
    },
    {
      type: 'Meal',
      value: 25
    },
    {
      type: 'Transport',
      value: 18
    },
    {
      type: 'Dental',
      value: 15
    },
    {
      type: 'Misc.',
      value: 10
    }
  ]

  const columns = [
    {
      title: 'Claims ID',
      dataIndex: 'claimsid',
      key: 'claimsid',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.claimsid - b.claimsid,
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
      render: (value, row, index) => {
        return new Date(value).toLocaleDateString('en-GB')
      }
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_, record) => (
        <Popconfirm
          title='Sure to delete?'
          onConfirm={() => deleteClaims(record.claimsid)}
        >
          <Button icon={<DeleteOutlined />} />
        </Popconfirm>
      )
    }
  ]
  const config = {
    appendPadding: 10,
    data: data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    label: {
      type: 'inner',
      content: '{name} {percentage}'
    },
    interactions: [{ type: 'pie-legend-active' }, { type: 'element-active' }]
  }

  return (
    <Layout>
      <Navbar name='claim' />
      <Content className='pie'>
        <Row
          style={{ background: '#fff', justifyContent: 'center', height: 400 }}
        >
          <Pie {...config} />
        </Row>
        <Row style={{ backgroundColor: '#fff', float: 'right', marginTop: 10 }}>
          <Button
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => {
              setisClaimVisible(true)
            }}
          >
            New Claims
          </Button>
          <ClaimModal
            isClaimVisible={isClaimVisible}
            setisClaimVisible={setisClaimVisible}
            refreshclaims={refreshclaims}
          />
        </Row>
        <Row
          style={{
            background: '#fff',
            justifyContent: 'center',
            marginTop: 50
          }}
        >
          <Table
            dataSource={claimsData}
            columns={columns}
            pagination={false}
            scroll={{ y: 350 }}
          />
        </Row>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Team 08</Footer>
    </Layout>
  )
}

export default ClaimPage
