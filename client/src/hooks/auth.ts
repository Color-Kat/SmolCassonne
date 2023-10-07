import {IUser} from "@/store/auth/auth.slice.ts";
import {useTSelector} from "@hooks/redux.ts";
import {useGetUserQuery} from "@/store/auth/auth.api.ts";

export const useUser = (): IUser|null => {
    const user = useTSelector(state => state.auth.user);
    // const {data: user } = useGetUserQuery();

    return user;
}