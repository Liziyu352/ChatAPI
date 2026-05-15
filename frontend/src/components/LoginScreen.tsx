import { Button, Card, Form, Input, Typography } from 'antd'

import type { LoginFormValues } from '../types/chat'

type LoginScreenProps = {
  loading: boolean
  onSubmit: (values: LoginFormValues) => void | Promise<void>
}

export function LoginScreen({ loading, onSubmit }: LoginScreenProps) {
  const [form] = Form.useForm<LoginFormValues>()

  return (
    <div className="login-screen">
      <div className="login-backdrop" />
      <Card className="login-card">
        <div className="login-copy">
          <Typography.Text className="eyebrow">ChatAPI</Typography.Text>
          <Typography.Title level={2} className="login-title">
            登录后进入聊天工作台
          </Typography.Title>
          <Typography.Paragraph className="login-desc">
            后端提供 OpenAI Responses 风格接口，前端负责会话列表、移动端侧栏和分段暂存。
          </Typography.Paragraph>
        </div>
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => void onSubmit(values)}
          autoComplete="off"
          className="login-form"
          initialValues={{ username: '', password: '' }}
        >
          <Form.Item
            label="账号"
            name="username"
            rules={[{ required: true, message: '请输入账号' }]}
          >
            <Input placeholder="账号" size="large" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="密码" size="large" />
          </Form.Item>
          <Button type="primary" htmlType="submit" size="large" block loading={loading}>
            登录
          </Button>
        </Form>
      </Card>
    </div>
  )
}
