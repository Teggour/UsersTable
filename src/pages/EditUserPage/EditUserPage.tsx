import React from "react";
import { Typography, Form, Button, Select, Input, notification } from "antd";
import { WarningOutlined, CheckCircleOutlined } from "@ant-design/icons";

import PageTemplate from "../../components/PageTemplate/PageTemplate";
import { useQueryUser } from "../../hooks/useQueryUser";
import FetchingError from "../../components/FetchingError/FetchingError";
import Loader from "../../components/Loader/Loader";
import { useHistory, useParams } from "react-router-dom";
import { IUser } from "../../services/Users.service";
import { useMutationUser } from "../../hooks/useMutationUser";

type TParams = { userId: string };

const EditUserPage: React.FC = () => {
	const [form] = Form.useForm();
	const history = useHistory();

	const params = useParams<TParams>();

	const userId = parseInt(params.userId, 10);

	const openNotification = (error: any): void => {
		notification.open({
			message: "Error!",
			description: error.message,
			icon: <WarningOutlined style={{ color: "red" }} />,
		});
	};

	const onMutationSuccess = (): void => {
		notification.open({
			message: "Success!",
			description: "User changed!",
			icon: <CheckCircleOutlined style={{ color: "green" }} />,
		});

		history.push({ pathname: `/users/${userId}` });
	};

	const onMutationError = (err: any): void => {
		notification.open({
			message: "Error!",
			description: err.message,
			icon: <WarningOutlined style={{ color: "red" }} />,
		});
	};

	const { isLoading, isError, isSuccess, response } = useQueryUser(
		userId,
		openNotification
	);

	const { isMutationLoading, mutateAsync } = useMutationUser(
		onMutationSuccess,
		onMutationError
	);

	const onFinish = async (userData: any) => {
		const userInfo: IUser = { ...userData, id: userId };

		await mutateAsync(userInfo);
	};

	return (
		<PageTemplate>
			<Typography.Title>Edit user #{userId}</Typography.Title>

			{isLoading || isMutationLoading ? (
				<Loader />
			) : (
				<>
					{isError && <FetchingError />}

					{isSuccess && (
						<Form
							form={form}
							name="edit_user"
							onFinish={onFinish}
							initialValues={{
								email: response?.data.email,
								name: response?.data.name,
								gender: response?.data.gender,
								status: response?.data.status,
							}}
							scrollToFirstError
							labelCol={{
								xs: { span: 24 },
								sm: { span: 8 },
							}}
							wrapperCol={{
								xs: { span: 24 },
								sm: { span: 16 },
							}}
						>
							<Form.Item
								name="name"
								label="Name"
								rules={[
									{
										required: true,
										message: "Please input your name!",
										whitespace: true,
									},
									{
										max: 30,
										message: "Max length is 30 symbols!",
									},
								]}
							>
								<Input />
							</Form.Item>

							<Form.Item
								name="email"
								label="Email"
								rules={[
									{
										type: "email",
										message:
											"The input is not valid E-mail!",
									},
									{
										required: true,
										message: "Please input your E-mail!",
									},
									{
										max: 50,
										message: "Max length is 50 symbols!",
									},
								]}
							>
								<Input />
							</Form.Item>

							<Form.Item
								name="gender"
								label="Gender"
								rules={[
									{
										required: true,
										message: "Please select gender!",
									},
								]}
							>
								<Select placeholder="select your gender">
									<Select.Option value="male">
										Male
									</Select.Option>
									<Select.Option value="female">
										Female
									</Select.Option>
								</Select>
							</Form.Item>

							<Form.Item
								name="status"
								label="Status"
								rules={[
									{
										required: true,
										message: "Please select status!",
									},
								]}
							>
								<Select placeholder="select your status">
									<Select.Option value="active">
										Active
									</Select.Option>
									<Select.Option value="inactive">
										Inactive
									</Select.Option>
								</Select>
							</Form.Item>

							<Form.Item
								wrapperCol={{
									xs: {
										span: 24,
										offset: 0,
									},
									sm: {
										span: 16,
										offset: 8,
									},
								}}
							>
								<Button type="primary" htmlType="submit">
									Save
								</Button>
							</Form.Item>
						</Form>
					)}
				</>
			)}
		</PageTemplate>
	);
};

export default EditUserPage;
