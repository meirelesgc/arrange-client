import React from "react";
import { Button, Card, Flex, Typography } from "antd";

const Banner = ({ title, description, buttons }) => {
    return <Card style={{ height: 260, padding: '20px' }}>
        <Flex vertical gap='30px'>
            <Flex vertical align="flex-start">
                <Typography.Title level={2} strong>
                    {title}
                </Typography.Title>
                <Typography.Text type="secondary" strong>
                    {description}
                </Typography.Text>
            </Flex>

            <Flex gap='large'>
                {buttons.map((button, index) => (
                    <Button
                        key={index}
                        type={button.type}
                        size="large"
                        icon={button.icon}
                        onClick={button.onClick}>
                        {button.label}
                    </Button>
                ))}
            </Flex>
        </Flex>
    </Card>;
};

export default Banner;
