import { useMutation } from "@tanstack/react-query";

import { IUser, UsersService } from "../services/Users.service";

export const useMutationUser = (
	onMutationSuccess: () => void,
	onMutationError: (err: any) => void
) => {
	const { isLoading, mutateAsync } = useMutation(
		["edituser"],
		(user: IUser) => {
			return UsersService.editUser(user);
		},
		{
			onSuccess: onMutationSuccess,
			onError: onMutationError,
		}
	);

	return { isMutationLoading: isLoading, mutateAsync };
};
