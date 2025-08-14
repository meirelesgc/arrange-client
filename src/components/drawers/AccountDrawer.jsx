import { useState, useEffect } from 'react';
import { Drawer as AntDrawer, Form, Typography, Input, Button, Flex, Descriptions, message, Spin } from 'antd';
import { useToken, useCreateUser, useMySelf } from '../../hooks/useUser';

const getToken = () => localStorage.getItem('authToken');
const setToken = (token) => localStorage.setItem('authToken', token);
const removeToken = () => localStorage.removeItem('authToken');

const ROLES = {
    'ADMIN': 'Administrador',
    'DEFAULT': 'Usuário Padrão',
    'TECHNICIAN': 'Técnico',
};

function Login({ onLoginSuccess, onSignUpClick }) {
    const [form] = Form.useForm();
    const { mutate, isPending } = useToken();

    const handleSubmit = (values) => {
        mutate(values, {
            onSuccess: (data) => {
                message.success('Login realizado com sucesso!');
                onLoginSuccess(data.access_token);
                form.resetFields();
            },
            onError: () => {
                message.error('Email ou senha incorretos. Tente novamente.');
            }
        });
    };

    return <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Flex align='center' justify='center' vertical>
            <Typography.Title level={3} strong>Login</Typography.Title>
            <Typography.Text type="secondary">Acesse sua conta para continuar.</Typography.Text>
        </Flex>

        <Form.Item
            label={<Typography.Title level={5} strong>Email:</Typography.Title>}
            name="email"
            rules={[{ required: true, type: 'email', message: 'Digite um email válido' }]}
        >
            <Input size='large' placeholder='seu@email.com' />
        </Form.Item>

        <Form.Item
            label={<Typography.Title level={5} strong>Senha:</Typography.Title>}
            name="password"
            rules={[{ required: true, message: 'Digite sua senha' }]}
        >
            <Input.Password size='large' placeholder='Sua senha' />
        </Form.Item>

        <Flex align='center' justify='space-between' style={{ marginTop: 24 }}>
            <Button type="link" onClick={onSignUpClick} style={{ padding: 0 }}>
                Não tem uma conta? Crie uma!
            </Button>
            <Button type='primary' htmlType='submit' size='large' loading={isPending}>
                Entrar
            </Button>
        </Flex>
    </Form>
}

function SignUp({ onLoginClick }) {
    const [form] = Form.useForm();
    const { mutate, isPending } = useCreateUser();

    const handleSubmit = (values) => {
        mutate(values, {
            onSuccess: () => {
                message.success('Conta criada com sucesso! Faça o login para continuar.');
                onLoginClick();
                form.resetFields();
            },
            onError: (error) => {
                const errorMessage = error.response?.data?.detail || 'Não foi possível criar a conta. Verifique os dados e tente novamente.';
                message.error(errorMessage);
            }
        });
    };

    return (
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
            <Flex align='center' justify='center' vertical>
                <Typography.Title level={3} strong>Criar Conta</Typography.Title>
                <Typography.Text type="secondary">Rápido e fácil, vamos começar.</Typography.Text>
            </Flex>

            <Form.Item
                label={<Typography.Title level={5} strong>Nome:</Typography.Title>}
                name="username"
                rules={[{ required: true, message: 'Digite seu nome' }]}
            >
                <Input size='large' placeholder='Seu nome completo' />
            </Form.Item>

            <Form.Item
                label={<Typography.Title level={5} strong>Email:</Typography.Title>}
                name="email"
                rules={[{ required: true, type: 'email', message: 'Digite um email válido' }]}
            >
                <Input size='large' placeholder='seu.melhor@email.com' />
            </Form.Item>

            <Form.Item
                label={<Typography.Title level={5} strong>Senha:</Typography.Title>}
                name="password"
                hasFeedback
                rules={[{ required: true, message: 'Digite uma senha' }]}
            >
                <Input.Password size='large' placeholder='Crie uma senha forte' />
            </Form.Item>

            <Form.Item
                label={<Typography.Title level={5} strong>Confirmar Senha:</Typography.Title>}
                name="confirm_password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    { required: true, message: 'Confirme sua senha' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('As senhas não coincidem!'));
                        },
                    }),
                ]}
            >
                <Input.Password size='large' placeholder='Digite a senha novamente' />
            </Form.Item>

            <Flex align='center' justify='space-between' style={{ marginTop: 24 }}>
                <Button type="link" onClick={onLoginClick} style={{ padding: 0 }}>
                    Já tem uma conta? Faça login
                </Button>
                <Button type='primary' htmlType='submit' size='large' loading={isPending}>
                    Inscrever-se
                </Button>
            </Flex>
        </Form>
    );
}

function Account({ onLogout }) {
    const { data: userData, isLoading, isError } = useMySelf();

    // ... (código para isLoading e isError continua o mesmo)

    if (!userData) return null;

    return (
        <Flex vertical gap="large">
            <Typography.Title level={3}>Minha Conta</Typography.Title>
            <Descriptions bordered column={1}>
                <Descriptions.Item label="Nome de Usuário">{userData.username}</Descriptions.Item>
                <Descriptions.Item label="Email">{userData.email}</Descriptions.Item>
                <Descriptions.Item label="Tipo de Conta">
                    {ROLES[userData.role] || userData.role}
                </Descriptions.Item>
            </Descriptions>
            <Button type="primary" danger size='large' onClick={onLogout}>
                Sair
            </Button>
        </Flex>
    );
}

export default function Drawer({ toggleDrawer, open }) {
    const [view, setView] = useState('login');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (open) {
            const token = getToken();
            if (token) {
                setIsAuthenticated(true);
                setView('account');
            } else {
                setIsAuthenticated(false);
                setView('login');
            }
        }
    }, [open]);

    const handleLoginSuccess = (token) => {
        setToken(token);
        setIsAuthenticated(true);
        setView('account');
    };

    const handleSignUpSuccess = (token) => {
        setToken(token);
        setIsAuthenticated(true);
        setView('account');
    };

    const handleLogout = () => {
        removeToken();
        setIsAuthenticated(false);
        setView('login');
    };

    const renderContent = () => {
        switch (view) {
            case 'login':
                return <Login onLoginSuccess={handleLoginSuccess} onSignUpClick={() => setView('signup')} />;
            case 'signup':
                return <SignUp onSignUpSuccess={handleSignUpSuccess} onLoginClick={() => setView('login')} />;
            case 'account':
                return <Account onLogout={handleLogout} />;
            default:
                return <Login onLoginSuccess={handleLoginSuccess} onSignUpClick={() => setView('signup')} />;
        }
    };

    return (
        <AntDrawer
            title={isAuthenticated ? 'Página do Usuário' : 'Acesso à Conta'}
            onClose={toggleDrawer}
            open={open}
            size='large'
        >
            {renderContent()}
        </AntDrawer>
    );
}