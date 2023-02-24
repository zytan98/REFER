import { Input, Modal, Select, DatePicker, Form, message, Row } from 'antd'
import './LeaveModal.css'
import api from '../../../api'
import { useState } from 'react'

export const LeaveModal = props => {
  const { TextArea } = Input

  const [form] = Form.useForm()

  const { RangePicker } = DatePicker

  const { Option } = Select

  const [leavesForm, setleavesForm] = useState({
    leavetype: '',
    datefrom: '',
    dateto: '',
    approver: '',
    remarks: '',
    employeename: sessionStorage.user,
    status: 'Pending'
  })

  const [confirmLeavesForm, setconfirmLeavesForm] = useState(false)

  const dateChange = value => {
    console.log(value)
    if (value) {
      setleavesForm({
        ...leavesForm,
        datefrom: value[0].format('YYYY-MM-DD'),
        dateto: value[1].format('YYYY-MM-DD')
      })
    } else {
      setleavesForm({ ...leavesForm, datefrom: value, dateto: value })
    }
  }
  const typeChange = value => {
    setleavesForm({ ...leavesForm, leavetype: value })
  }
  const approverChange = value => {
    setleavesForm({ ...leavesForm, approver: value })
  }
  const remarksChange = e => {
    setleavesForm({ ...leavesForm, remarks: e.target.value })
  }
  const createLeave = () => {
    fetch(api.API_URL + 'leaves', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(leavesForm)
    })
      .then(res => res.json())
      .then(
        result => {
          message.success(result)
          props.refreshleaves()
        },
        error => {
          message.error('Please retry')
        }
      )
  }

  return (
    <div>
      <Modal
        title='New Leave Application'
        visible={props.isLeaveVisible}
        okText='Confirm'
        onOk={() => {
          form
            .validateFields()
            .then(() => {
              setconfirmLeavesForm(true)
              if (!sessionStorage.finished) {
                sessionStorage.setItem('finished', [
                  sessionStorage.TimeCheck,
                  new Date().toLocaleTimeString(),
                  sessionStorage.PageCount
                ])
              }
            })
            .catch(() => {
              message.error('Please retry')
            })
        }}
        onCancel={() => {
          form.resetFields()
          props.setisLeaveVisible(false)
        }}
        zIndex='1'
      >
        <Form form={form} layout='horizontal' initialValues={{}}>
          <Form.Item
            name='dates'
            label='Select Date:'
            rules={[
              {
                type: 'array',
                required: true,
                message: 'Please select the dates!'
              }
            ]}
          >
            <RangePicker onChange={dateChange} />
          </Form.Item>
          <Form.Item
            name='type'
            label='Leave Type: '
            rules={[
              {
                required: true,
                message: 'Please select the leave type!'
              }
            ]}
          >
            <Select
              style={{ width: 150 }}
              placeholder='Select Type'
              onChange={typeChange}
            >
              <Option value='Annual'>Annual</Option>
              <Option value='Sick'>Sick</Option>
              <Option value='Hospitalization'>Hospitalization</Option>
              <Option value='Urgent'>Urgent</Option>
            </Select>
          </Form.Item>
          <Form.Item label='AVAILABLE DAYS: '>8 </Form.Item>
          <Form.Item
            name='approver'
            label='Approver: '
            rules={[
              {
                required: true,
                message: 'Please select the approver!'
              }
            ]}
          >
            <Select
              style={{ width: 150 }}
              placeholder='Select Approver'
              onChange={approverChange}
            >
              <Option value='Kendrick'>Kendrick</Option>
              <Option value='Zheng Yuan'>Zheng Yuan</Option>
              <Option value='Jun Jie'>Jun Jie</Option>
            </Select>
          </Form.Item>
          <Form.Item name='remarks' label='Remarks: '>
            <TextArea onChange={remarksChange} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title='Review Submission Detail(Leaves)'
        visible={confirmLeavesForm}
        okText='Confirm'
        cancelText='Back'
        onOk={() => {
          form.resetFields()
          createLeave()
          props.setisLeaveVisible(false)
          setconfirmLeavesForm(false)
        }}
        onCancel={() => {
          setconfirmLeavesForm(false)
        }}
      >
        <Row style={{ fontSize: 25, marginBottom: 20 }}>
          Leave period: {leavesForm.datefrom} to {leavesForm.dateto}
        </Row>
        <Row style={{ fontSize: 25, marginBottom: 20 }}>
          Leave type: {leavesForm.leavetype}
        </Row>
        <Row style={{ fontSize: 25, marginBottom: 20 }}>Available days: 8</Row>
        <Row style={{ fontSize: 25, marginBottom: 20 }}>
          Approver: {leavesForm.approver}
        </Row>
        <Row style={{ fontSize: 25 }}>Remarks: {leavesForm.remarks}</Row>
      </Modal>
    </div>
  )
}
export default LeaveModal
