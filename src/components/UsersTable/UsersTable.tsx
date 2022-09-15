import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Table } from "antd";
import { TablePaginationConfig } from "antd/lib/table";

import { IFetchUsersData } from "../../services/Users.service";

const columns = [
	{
		title: "Name",
		dataIndex: "name",
		width: "25%",
	},
	{
		title: "Gender",
		dataIndex: "gender",
		filters: [
			{
				text: "Male",
				value: "male",
			},
			{
				text: "Female",
				value: "female",
			},
		],
		onFilter: (value: string | number | boolean, record: any): boolean =>
			value === record.gender,
		width: "15%",
	},
	{
		title: "Email",
		dataIndex: "email",
		width: "45%",
	},
	{
		title: "Status",
		dataIndex: "status",
		filters: [
			{
				text: "Active",
				value: "active",
			},
			{
				text: "Inactive",
				value: "inactive",
			},
		],
		onFilter: (value: string | number | boolean, record: any): boolean =>
			value === record.status,
		width: "15%",
	},
];

interface IProps extends RouteComponentProps {
	response?: IFetchUsersData;
	isLoading: boolean;
	currentPage: number;
}

const UsersTable: React.FC<IProps> = ({
	response,
	isLoading,
	currentPage,
	history,
	location,
}) => {
	return (
		<Table
			columns={columns}
			dataSource={response?.data}
			loading={isLoading}
			pagination={{
				total: response?.meta.pagination.total,
				current: currentPage,
				pageSize: 10,
				position: ["bottomCenter", "topCenter"],
				showSizeChanger: false,
				showTitle: false,
			}}
			scroll={{ x: true }}
			onChange={(newPagination: TablePaginationConfig) => {
				history.push({
					pathname: location.pathname,
					search: `page=${newPagination.current}`,
				});
			}}
			onRow={(record) => {
				return {
					onClick: () => {
						history.push({
							pathname: location.pathname + `/${record.id}`,
						});
					},
				};
			}}
		/>
	);
};

export default withRouter(UsersTable);
