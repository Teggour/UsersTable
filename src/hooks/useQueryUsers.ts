import { useQuery } from "@tanstack/react-query";

import { IUser, UsersService } from "../services/Users.service";

export const useQueryUsers = (
	currentPage: number,
	openNotification: (err: any) => void
) => {
	const {
		isLoading,
		data: response,
		refetch,
	} = useQuery(
		["users list", currentPage],
		() => {
			return UsersService.getUsersByPage(currentPage);
		},
		{
			select: ({ data }) => ({
				...data,
				data: data.data.map((e: IUser, i: number) => ({
					...e,
					key: i + 1,
				})),
			}),
			onError: (error: any) => {
				openNotification(error);
			},
		}
	);

	return { isLoading, response, refetch };
};
