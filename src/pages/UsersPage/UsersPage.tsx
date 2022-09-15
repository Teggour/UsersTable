import React, { useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Typography, notification } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import { useQueryUsers } from "../../hooks/useQueryUsers";

import PageTemplate from "../../components/PageTemplate/PageTemplate";
import UsersTable from "../../components/UsersTable/UsersTable";

const UsersPage: React.FC<RouteComponentProps> = ({ history, location }) => {
	const searchParams = new URLSearchParams(location.search);

	const currentPage = parseInt(searchParams.get("page") || "1", 10);

	const openNotification = (error: any): void => {
		notification.open({
			message: "Error!",
			description: error.message,
			icon: <WarningOutlined style={{ color: "red" }} />,
		});
	};

	const { response, isLoading, refetch } = useQueryUsers(
		currentPage,
		openNotification
	);

	if (
		response &&
		(currentPage > response.meta.pagination.pages || currentPage < 1)
	) {
		notification.open({
			message: "Warning!",
			description:
				"The page number was entered incorrectly. Please change it.",
			icon: <WarningOutlined style={{ color: "#ffd800" }} />,
		});
	}

	useEffect(() => {
		refetch();
	}, [currentPage]); // eslint-disable-line

	return (
		<PageTemplate>
			<Typography.Title>Users</Typography.Title>

			<UsersTable
				response={response}
				isLoading={isLoading}
				currentPage={currentPage}
			/>
		</PageTemplate>
	);
};

export default withRouter(UsersPage);
