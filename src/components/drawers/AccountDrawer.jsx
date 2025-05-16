import { Drawer as AntDrawer, Space, Form, Typography, Input, Button, Flex } from 'antd';

import { getToken, setToken, removeToken } from '../../services/auth'

function Login() {

}

function SignUp({ toggleDrawer, mutate }) {
    const [form] = Form.useForm()

    const handleAbort = () => {
        form.resetFields()
        toggleDrawer()
    }

    const handleSubmit = () => {
        form.validateFields()
            .then(values => {
                mutate(values)
                form.resetFields()
                toggleDrawer()
            })
            .catch(() => { })
    }

    return <Form layout="vertical" form={form} initialValues={{ username: '', email: '', password: '', confirm_password: '' }}>
        <Flex align='center' justify='center'><Typography.Title level={3} strong>Criar conta</Typography.Title></Flex>

        <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Typography.Title level={5} strong>Nome:</Typography.Title>
            <Form.Item name="username" rules={[{ required: true, message: 'Digite seu nome' }]}>
                <Input size='large' />
            </Form.Item>
        </Space>

        <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Typography.Title level={5} strong>Email:</Typography.Title>
            <Form.Item name="email" rules={[{ required: true, type: 'email', message: 'Digite um email válido' }]}>
                <Input size='large' />
            </Form.Item>
        </Space>

        <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Typography.Title level={5} strong>Senha:</Typography.Title>
            <Form.Item name="password" rules={[{ required: true, message: 'Digite uma senha' }]}>
                <Input.Password size='large' />
            </Form.Item>
        </Space>

        <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Typography.Title level={5} strong>Confirmar Senha:</Typography.Title>
            <Form.Item name="confirm_password" dependencies={['password']}>
                <Input.Password size='large' />
            </Form.Item>
        </Space>

        <Flex align='center' justify='space-around'>
            <Button type='primary' size='large'>Inscrever-se</Button>
            <Button size='large'>Login</Button>
        </Flex>
    </Form>
}

function ForgotPassword() {

}

function ResetPassword() {

}

function Account() {

}


export default function Drawer({ toggleDrawer, open }) {
    return <AntDrawer title={'Página do usuário'} onClose={toggleDrawer} open={open} size='large'>
        <SignUp />
    </AntDrawer>
}