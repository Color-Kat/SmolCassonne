import React, {memo, useCallback} from "react";
import {useTSelector} from "@hooks/redux.ts";
import {useLogoutMutation} from "@/store/auth/auth.api.ts";
import {Dropdown} from "@components/Dropdowns";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "@components/Buttons";
import {IUser} from "@/store/auth/auth.slice.ts";

const AvatarButton = memo(({user}: {user: IUser}) => (
    <div className="flex gap-3 items-center">
        <span>{user.name} </span>
        <div className="h-10 w-10 bg-indigo-100 text-indigo-900 rounded-full md:flex hidden items-center justify-center">
            {user.name[0].toUpperCase()}
        </div>
    </div>
))

export const AuthButton: React.FC = memo(() => {

    const {user, isLoading} = useTSelector(state => state.auth);
    const [logout] = useLogoutMutation();

    const navigate = useNavigate();

    if(isLoading) return null;

    if(user) return (
        <Dropdown
            ButtonComponent={() => <AvatarButton user={user} />}
            header="Управление аккаунтом"
            groups={[
                [
                    {
                        text: 'Друзья',
                        onClick: () => navigate('/friends')
                    },
                    {
                        text: 'Профиль',
                        onClick: () => navigate('/profile')
                    },
                    {
                        text: 'Настройки',
                        onClick: () => navigate('/settings')
                    }
                ],
                // The last group
                [{
                    text: 'Выйти',
                    onClick: logout
                }]
            ]}
        />
    );

    return (
        <Link to="/login">
            <Button>Войти</Button>
        </Link>
    );

    // {
    //     user
    //         ? <button onClick={() => logout()}>Выйти</button>
    //         : <Link to="/login" className="hover:underline">Войти</Link>
    // }
});