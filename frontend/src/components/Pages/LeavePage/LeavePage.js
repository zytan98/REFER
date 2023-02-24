import { useState, useEffect } from 'react'
import { Layout, Row, Button, Table, message, Popconfirm } from 'antd'
import './LeavePage.css'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { Pie } from '@ant-design/charts'
import Navbar from '../../Navbar/Navbar'
import LeaveModal from '../../Modals/LeaveModal/LeaveModal'
import api from '../../../api'

export const LeavePage = () => {
  const { Content, Footer } = Layout

  const [isLeaveVisible, setisLeaveVisible] = useState(false)

  const [leavesData, setleavesData] = useState([])

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

  useEffect(() => {
    refreshleaves()
  }, [])

  const deleteLeaves = value => {
    fetch(api.API_URL + 'leaves', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ leaveid: value })
    })
      .then(res => res.json())
      .then(result => {
        message.success(result)
        refreshleaves()
      })
  }

  const data = [
    {
      type: 'Annual',
      value: 27
    },
    {
      type: 'Sick',
      value: 25
    },
    {
      type: 'Urgent',
      value: 18
    },
    {
      type: 'Hospital',
      value: 15
    },
  ]

  const columns = [
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
      title: 'Approver',
      dataIndex: 'approver',
      key: 'approver'
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_, record) => (
        <Popconfirm
          title='Sure to delete?'
          onConfirm={() => deleteLeaves(record.leaveid)}
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
      <Navbar name='leave' />
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
              setisLeaveVisible(true)
            }}
          >
            New Leaves
          </Button>
          <LeaveModal
            isLeaveVisible={isLeaveVisible}
            setisLeaveVisible={setisLeaveVisible}
            refreshleaves={refreshleaves}
          ></LeaveModal>
        </Row>
        <Row
          style={{
            background: '#fff',
            justifyContent: 'center',
            marginTop: 50
          }}
        >
          <Table
            dataSource={leavesData}
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

export default LeavePage
