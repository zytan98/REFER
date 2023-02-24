import {
  Input,
  Button,
  Modal,
  Select,
  InputNumber,
  Upload,
  Form,
  message,
  Row,
  Popover
} from 'antd'
import './ClaimModal.css'
import { UploadOutlined, InfoCircleOutlined } from '@ant-design/icons'
import api from '../../../api'
import { useState } from 'react'

export const ClaimModal = props => {
  const { TextArea } = Input

  const { Option } = Select

  const [form] = Form.useForm()

  const [claimsForm, setclaimsForm] = useState({
    claimstype: '',
    claimsamount: null,
    approver: '',
    invoiceid: '',
    remarks: '',
    employeename: sessionStorage.user,
    submissiondate: new Date().toLocaleString('en-GB') + '',
    status: 'Pending'
  })

  const [confirmClaimsForm, setconfirmClaimsForm] = useState(false)

  const typeChange = value => {
    setclaimsForm({ ...claimsForm, claimstype: value })
  }
  const amountChange = value => {
    setclaimsForm({ ...claimsForm, claimsamount: value })
  }
  const approverChange = value => {
    setclaimsForm({ ...claimsForm, approver: value })
  }
  const invoiceChange = e => {
    setclaimsForm({ ...claimsForm, invoiceid: e.target.value })
  }
  const remarksChange = e => {
    setclaimsForm({ ...claimsForm, remarks: e.target.value })
  }

  const createClaim = () => {
    fetch(api.API_URL + 'claims', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(claimsForm)
    })
      .then(res => res.json())
      .then(result => {
        message.success(result)
        props.refreshclaims()
      })
  }

  return (
    <div>
      <Modal
        title='New Claim Application'
        visible={props.isClaimVisible}
        okText='Confirm'
        onOk={() => {
          form
            .validateFields()
            .then(() => {
              setconfirmClaimsForm(true)
            })
            .catch(() => {
              message.error('Please retry')
            })
        }}
        onCancel={() => {
          form.resetFields()
          props.setisClaimVisible(false)
        }}
        zIndex='15'
      >
        <Form
          form={form}
          layout='horizontal'
          initialValues={{
            type: '',
            invoice: '',
            amount: '',
            approver: ''
          }}
        >
          <Form.Item
            name='type'
            label='Select Type'
            rules={[{ required: true, message: 'Type is required' }]}
          >
            <Select
              style={{ width: 150 }}
              placeholder='Select Type'
              onChange={typeChange}
            >
              <Option value='Medical'>Medical</Option>
              <Option value='Meal'>Meal</Option>
              <Option value='Transport'>Transport</Option>
              <Option value='Dental'>Dental</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name='invoice'
            label='Invoice ID'
            rules={[{ required: true, message: 'Invoice ID is required' }]}
          >
            <Input onChange={invoiceChange} />
          </Form.Item>
          <Form.Item
            name='amount'
            label='Claim Amount:'
            rules={[{ required: true, message: 'Claims amount is required' }]}
          >
            <InputNumber onChange={amountChange} min={0} />
          </Form.Item>
          <Form.Item
            name='approver'
            label='Approver:'
            rules={[{ required: true, message: 'Approver is required' }]}
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
          <Form.Item label='Supporting Documents:'>
            <Row>
              <Upload>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
              <Popover  content='You can add MCs, receipts, Invoices as supporting documents for your claim!'>
                <InfoCircleOutlined style={{marginTop:7,marginLeft:10}}/>
              </Popover>
            </Row>
          </Form.Item>
          <Form.Item label='Remarks:'>
            <TextArea onChange={remarksChange} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title='Review Submission Detail(Claims)'
        visible={confirmClaimsForm}
        okText='Confirm'
        cancelText='Back'
        onOk={() => {
          form.resetFields()
          createClaim()
          props.setisClaimVisible(false)
          setconfirmClaimsForm(false)
        }}
        onCancel={() => {
          setconfirmClaimsForm(false)
        }}
      >
        <Row style={{ fontSize: 25, marginBottom: 20 }}>
          Claims type: {claimsForm.claimstype}
        </Row>
        <Row style={{ fontSize: 25, marginBottom: 20 }}>
          Invoice ID: {claimsForm.invoiceid}
        </Row>
        <Row style={{ fontSize: 25, marginBottom: 20 }}>
          Claims amount: {claimsForm.claimsamount}
        </Row>
        <Row style={{ fontSize: 25, marginBottom: 20 }}>
          Approver: {claimsForm.approver}
        </Row>
        <Row style={{ fontSize: 25, marginBottom: 20 }}>
          Supporting Documents:{' '}
        </Row>
        <Row style={{ fontSize: 25 }}>Remarks: {claimsForm.remarks}</Row>
      </Modal>
    </div>
  )
}

export default ClaimModal
