import React, { useState } from "react";
import { Row, Col, Card, Form, Input, Button, DatePicker, Select, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined, HomeOutlined, ContactsOutlined } from "@ant-design/icons";
import axios from 'axios';

import MainNavBar from "./MainNavBar.js";
import { interests } from "../constants/interests.js";
import { titleCase } from "../utils/utils.js";
import '../styles/Signup.css';

const { Option } = Select;

const Signup = () => {
    
    const [input, setInput] = useState({
        username: "",
        password: "",
        email: "",
        interests: [],
        locations: []
    });

    const onInputChange = (name, e) => {

        if (name === "interests") {
            input[name] = e;
        } else if (name === "dob") {
            input[name] = e._d.toLocaleString().split(",")[0];
        } else {
            input[name] = e.target.value;
        }
        
        setInput(input);
    };

    const onSubmit = () => {

        if (input['username'] === "" || 
            input['password'] === "" || 
            input['email'] === "" || 
            input['interests'] === "" ||
            input['locations'] === "") {

            message.error("Please fill in all fields.");
        } else if (input['interests'].length < 2) {
            message.error("Please select at least 2 interests.");
        } else {

            message.success('Successfully created an account!');

            axios.post(`http://localhost:8000/createuser`, {
                username: input["username"],
                password: input["password"],
                email: input["email"],
                interests: input["interests"],
                locations: input["locations"],
            }, {
                headers: {
                    'content-type': 'application/json'
                }
            }).then();

        }
    };

    return (
        <div className="background">
            <Row>
                <MainNavBar/>
            </Row>
            <Row style={{marginTop: '50px'}}>  
                <Col span={14}>


                </Col>
                <Col span={10}>
                    <Card className="form-card">
                        <Form layout="vertical">
                            <Form.Item
                                label={<b>Username</b>}
                                rules={[{ required: true }]}
                                style={{
                                    display: "inline-block",
                                    padding: "0 8px 0 0",
                                    width: "50%",
                                  }}
                            >
                                <Input prefix={<UserOutlined />} onChange={(e) => {onInputChange("username", e)}} name="username" />
                            </Form.Item>
                            <Form.Item
                                label={<b>Password</b>}
                                rules={[{ required: true }]}
                                style={{
                                    display: "inline-block",
                                    padding: "0 8px 0 0",
                                    width: "50%",
                                  }}
                            >
                                <Input.Password prefix={<LockOutlined />} onChange={(e) => {onInputChange("password", e)}} name="password" />
                            </Form.Item>
                           
                            <Form.Item
                                label={<b>Email</b>}
                                rules={[{ required: true }]}
                                style={{
                                    display: "inline-block",
                                    padding: "0 8px 0 0",
                                    width: "50%",
                                  }}
                            >
                                <Input prefix={<MailOutlined />} onChange={(e) => {onInputChange("email", e)}} name="email" />
                            </Form.Item>
                            
                        
                            <Form.Item
                                label={<b>Interests</b>}
                                rules={[{ required: true }]}
                            >
                                <Select
                                    mode="multiple"
                                    placeholder="Select Interests"
                                    showSearch={false}
                                    allowClear={true}
                                    onChange={(e) => {onInputChange("interests", e)}}
                                    >
                                        {interests.map((interest) => (
                                            <Option value={interest}>{titleCase(interest)}</Option>
                                        ))}
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button onClick={onSubmit} type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Signup;
