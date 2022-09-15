import { useQuery } from "@tanstack/react-query";

import { IFetchUserData, UsersService } from "../services/Users.service";

interface IQuery {
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	data?: IFetchUserData;
}

export const useQueryUser = (
	userId: number,
	openNotification: (err: any) => void
) => {
	const {
		isLoading,
		isError,
		isSuccess,
		data: response,
	}: IQuery = useQuery(
		["user", userId],
		() => {
			return UsersService.getUserById(userId);
		},
		{
			select: ({ data }) => data,
			onError: (error: any) => {
				openNotification(error);
			},
		}
	);

	return { isLoading, isError, isSuccess, response };
};
