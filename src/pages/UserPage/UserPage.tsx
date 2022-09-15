import React from "react";
import { RouteComponentProps, withRouter, match } from "react-router-dom";
import { Descriptions, Typography, Button, notification } from "antd";
import { EditOutlined, WarningOutlined } from "@ant-design/icons";

import PageTemplate from "../../components/PageTemplate/PageTemplate";
import { useQueryUser } from "../../hooks/useQueryUser";
import FetchingError from "../../components/FetchingError/FetchingError";
import Loader from "../../components/Loader/Loader";

type TUserIdParams = { userId: string };

export interface MyRouteComponentProps extends RouteComponentProps {
	match: match<TUserIdParams>;
}

const UserPage: React.FC<MyRouteComponentProps> = ({
	history,
	location,
	match,
}) => {
	const userId = parseInt(match.params.userId, 10);

	const openNotification = (error: any): void => {
		notification.open({
			message: "Error!",
			description: error.message,
			icon: <WarningOutlined style={{ color: "red" }} />,
		});
	};

	const { isLoading, isError, isSuccess, response } = useQueryUser(
		userId,
		openNotification
	);

	return (
		<PageTemplate>
			<Typography.Title>User #{userId}</Typography.Title>

			{isLoading && <Loader />}

			{isError && <FetchingError />}

			{isSuccess && (
				<Descriptions
					column={2}
					title={
						<>
							User info {"\t"}
							<Button
								type="primary"
								size="small"
								shape="circle"
								onClick={() => {
									history.push({
										pathname: location.pathname + "/edit",
									});
								}}
							>
								<EditOutlined />
							</Button>
						</>
					}
				>
					<Descriptions.Item
						label="Name"
						labelStyle={{ fontWeight: 700 }}
					>
						{response?.data.name}
					</Descriptions.Item>

					<Descriptions.Item
						label="Email"
						labelStyle={{ fontWeight: 700 }}
					>
						{response?.data.email}
					</Descriptions.Item>

					<Descriptions.Item
						label="Gender"
						labelStyle={{ fontWeight: 700 }}
					>
						{response?.data.gender}
					</Descriptions.Item>

					<Descriptions.Item
						label="Status"
						labelStyle={{ fontWeight: 700 }}
					>
						{response?.data.status}
					</Descriptions.Item>
				</Descriptions>
			)}
		</PageTemplate>
	);
};

export default withRouter(UserPage);
