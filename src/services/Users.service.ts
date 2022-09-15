import axiosInstance from "../axios/index";

type Gender = "male" | "female";

type Status = "active" | "inactive";

export interface IUser {
	email: string;
	gender: Gender;
	id: number;
	name: string;
	status: Status;
}

export interface IPagination {
	limit: number;
	links: { current: any; previous: any; next: any };
	page: number;
	pages: number;
	total: number;
}

export interface IFetchUsersData {
	data: IUser[];
	meta: { pagination: IPagination };
}

export interface IFetchUserData {
	data: IUser;
	meta: null;
}

export const UsersService = {
	getUsersByPage: async (page: number = 1) => {
		return axiosInstance.get<IFetchUsersData>(`/users?page=${page}`);
	},
	getUserById: async (userId: number) => {
		return axiosInstance.get<IFetchUserData>(`/users/${userId}`);
	},
	editUser: async (user: IUser) => {
		return axiosInstance.put(`/users/${user.id}`, user);
	},
};
