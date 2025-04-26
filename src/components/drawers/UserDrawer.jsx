import { Drawer as AntDrawer, Input, Flex, Form, Button, message } from 'antd';

import { getToken } from '../../services/auth'
import { useToken } from '../../hooks/useUser';

function LoginDrawer() {
    const { mutate } = useToken()

    const handleLogin = (values) => {
        const { email, password } = values;
        mutate({ email, password }, {
            onSuccess: () => {
                message.success('Login realizado com sucesso!')
            },
            onError: () => {
                message.error('Falha ao fazer login!')
            }
        });
    }

    return <Flex style={{ height: '100%', width: '100%' }} vertical>
        <Form name="loginForm" layout="vertical" onFinish={handleLogin} size='large'>
            <Form.Item
                label="Email" name="email"
                rules={[{ required: true, message: 'Por favor, insira seu e-mail!' }]}>
                <Input placeholder="Digite seu e-mail" />
            </Form.Item>
            <Form.Item
                label="Senha"
                name="password"
                rules={[{ required: true, message: 'Por favor, insira sua senha!' }]} >
                <Input.Password placeholder="Digite sua senha" />
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
                Entrar
            </Button>
        </Form>
    </Flex >
}

function UserDrawer() {
    return <Flex>
    </Flex>
}

export default function Drawer({ toggleDrawer, open }) {
    const token = getToken()
    return <AntDrawer title={'Página do usuário!'} onClose={toggleDrawer} open={open}>
        {token ? <UserDrawer /> : <LoginDrawer />}
    </AntDrawer>
}