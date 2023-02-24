import { Layout, Row, Button, Table, Typography, Popover } from 'antd'
import './PayPage.css'
import {
  DownloadOutlined,
  EyeOutlined,
  InfoCircleOutlined
} from '@ant-design/icons'
import { useState, useEffect } from 'react'
import PayModal from '../../Modals/PayModal/PayModal'
import api from '../../../api'

import Navbar from '../../Navbar/Navbar'

export const PayPage = () => {
  const { Content, Footer } = Layout

  const { Title } = Typography

  const [isPayVisible, setisPayVisible] = useState(false)

  const [paysData, setPaysData] = useState([])

  const [pdfPath, setpdfPath] = useState()

  const [pdfPass, setpdfPass] = useState()

  useEffect(() => {
    fetch(api.API_URL + 'payslips')
      .then(response => response.json())
      .then(data => {
        setPaysData(data)
      })
  }, [])

  const columns = [
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
      <Navbar name='payslip' />
      <Content className='pay'>
        <Row>
          <Title>My Payslips</Title>
          <Button icon={<DownloadOutlined />} className='button'></Button>
          <Popover content='Click the checkbox(es) to select multiple payslips to download'>
            <InfoCircleOutlined style={{ marginTop: 18, marginLeft: 10 }} />
          </Popover>
        </Row>

        <Table
          rowSelection
          dataSource={paysData}
          columns={columns}
          pagination={false}
          scroll={{ y: 350 }}
        />
        <PayModal
          isPayVisible={isPayVisible}
          setisPayVisible={setisPayVisible}
          pdfPath={pdfPath}
          setpdfPath={setpdfPath}
          pdfPass={pdfPass}
          setpdfPass={setpdfPass}
        />
      </Content>
      <Footer style={{ textAlign: 'center' }}>Team 08</Footer>
    </Layout>
  )
}

export default PayPage
