import { Form, Drawer as AntDrawer, Input, Flex, Button, message, Typography, Skeleton, Space, Divider, Select } from 'antd';

import { getToken, getId } from '../../services/auth'
import { useToken, useUser } from '../../hooks/useUser';

function LoginDrawer() {
    const { mutate } = useToken()

    const handleLogin = (values) => {
        const { email, password } = values;
        mutate({ email, password }, {
            onSuccess: () => {
                message.success('Login realizado com sucesso!');
            },
            onError: (error) => {
                if (error?.status === 401) {
                    message.error('Credenciais inválidas. Por favor, verifique seu email e senha.');
                } else {
                    const errorMessage = error?.message || 'Falha ao fazer login! Erro desconhecido.';
                    message.error(`Erro: ${errorMessage}`);
                }
            },
        });
    };

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
            <Button type="primary" htmlType="submit" >
                Entrar
            </Button>
        </Form>
    </Flex >
}

function UserDrawer({ id }) {
    const { data, isLoading } = useUser(id);
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    if (isLoading) return <Skeleton />;

    const handleFinish = (values) => {
        messageApi.open({
            type: 'warning',
            content: 'EM OBRAS',
        })
    };

    return <Flex vertical gap="30px">
        {contextHolder}
        <Space direction="vertical" size="small">
            <Typography.Text type="secondary" strong>Olá, {data.username}</Typography.Text>
            <Typography.Title level={2} strong>Informações da conta</Typography.Title>
            <Flex gap="large">
                <Typography.Text type="secondary">Função atribuída</Typography.Text>
                <Select
                    defaultValue={data?.role}
                    options={[{ value: 'DEFAULT', label: 'Padrão' }, { value: 'ADMIN', label: 'Administrador' }]}
                    style={{ width: '20%' }}
                    disabled={data?.role !== 'ADMIN'} />
            </Flex>
        </Space>
        <Divider />
        <Form form={form} initialValues={{ username: data.username, email: data.email, password: data.password }} onFinish={handleFinish}>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Typography.Title level={5} strong>Nome completo:</Typography.Title>
                <Form.Item name="username"><Input size="large" /></Form.Item>
            </Space>
            <Flex vertical>
                <Space align="end" wrap >
                    <Space direction="vertical" size="small">
                        <Typography.Title level={5} strong>E-mail:</Typography.Title>
                        <Form.Item name="email" ><Input size="large" /></Form.Item>
                    </Space>
                    <Space direction="vertical" size="small">
                        <Typography.Title level={5} strong>Senha:</Typography.Title>
                        <Form.Item name="password"><Input size="large" /></Form.Item>
                    </Space>
                </Space>
                <Button type="primary" size="large" htmlType="submit">Atualizar dados</Button>
            </Flex>
        </Form>
        <Divider />
    </Flex >
}

export default function Drawer({ toggleDrawer, open }) {
    const id = getId()
    return <AntDrawer title={'Página do usuário'} onClose={toggleDrawer} open={open} size='large'>
        {id ? <UserDrawer id={id} /> : <LoginDrawer />}
    </AntDrawer>
}