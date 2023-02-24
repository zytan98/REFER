import { Input, Modal, Form, message, Popover } from 'antd'
import './PayModal.css'
import api from '../../../api'
import { useState } from 'react'
import { InfoCircleOutlined } from '@ant-design/icons'

export const PayModal = props => {
  function b64toBlob (base64Data, contentType) {
    contentType = contentType || ''
    var size = 1024
    var bin = atob(base64Data)
    var binLength = bin.length
    var count = Math.ceil(binLength / size)
    var binArrays = new Array(count)

    for (var index = 0; index < count; ++index) {
      var begin = index * size
      var end = Math.min(begin + size, binLength)

      var bytes = new Array(end - begin)
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = bin[offset].charCodeAt(0)
      }
      binArrays[index] = new Uint8Array(bytes)
    }
    return new Blob(binArrays, { type: contentType })
  }
  const [form] = Form.useForm()

  const [payForm, setpayForm] = useState('')

  const passcheck = () => {
    if (props.pdfPass === payForm) {
      fetch(api.API_URL + 'payslips', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pdf: props.pdfPath })
      })
        .then(res => {
          return res.text()
        })
        .then(res => {
          const b64 = res.replace(/['"]+/g, '')
          const file = b64toBlob(b64, 'application/pdf')

          const fileURL = URL.createObjectURL(file)
          window.open(fileURL)
        })
    } else {
      message.error('Wrong Passcode')
    }
  }

  return (
    <Modal
      title='Password is required'
      visible={props.isPayVisible}
      okText='Confirm'
      onOk={() => {
        form
          .validateFields()
          .then(() => {
            form.resetFields()
            passcheck()
            props.setisPayVisible(false)
          })
          .catch(() => {
            message.error('Please retry')
          })
      }}
      onCancel={() => {
        form.resetFields()
        props.setisPayVisible(false)
      }}
      zIndex='1'
    >
      <Form.Item>
        The payslip is locked, it requires a passcode to open!
        <Popover content='To view the payslip, enter the month from the filename and the year(E.g. aug2021)'>
          <InfoCircleOutlined style={{ marginTop: 18, marginLeft: 10 }} />
        </Popover>
      </Form.Item>
      <Form form={form} layout='horizontal'>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            placeholder='Password'
            onChange={e => {
              setpayForm(e.target.value)
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default PayModal
