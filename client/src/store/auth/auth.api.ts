import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {IUser, setUser} from "./auth.slice.ts";
import {prepareAuthHeader} from "../utils/prepareAuthHeader.ts";

export const authApi = createApi({
    reducerPath: 'auth/api',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/',
        prepareHeaders: prepareAuthHeader,
        credentials: 'include', // This allows server to set cookies
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        /**
         * Get auth user and save it to slice store.
         * Can be updated by `invalidatesTags: ["User"]`.
         */
        getUser: builder.query<IUser, void>({
            query: () => ({
                url: `user`,
                credentials: "include",
            }),
            providesTags: ["User"],
            async onQueryStarted(id, {dispatch, queryFulfilled}) {
                // Put user in slice store
                try {
                    const {data} = await queryFulfilled;
                    dispatch(setUser(data))
                } catch (e) {
                    dispatch(setUser(null))
                }
            }
        }),

        /**
         * Register new user and invalidate User tage (refetch user).
         */
        register: builder.mutation<{ user: any, token: string }, {
            name: string,
            email: string,
            password: string,
            password_confirmation: string,
        }>({
            query: (payload) => ({
                url: `register`,
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ["User"],
        }),

        /**
         * Login user and invalidate User tage (refetch user).
         */
        login: builder.mutation<{ user: any, token: string }, {
            email: string,
            password: string,
            remember?: boolean
        }>({
            query: (payload) => ({
                url: `login`,
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ["User"],
        }),

        /**
         * Logout user and invalidate User tage (refetch user).
         */
        logout: builder.mutation<void, void>({
            query: () => ({
                url: `logout`,
                method: 'POST',
            }),
            invalidatesTags: ["User"],
        }),

        /**
         * Send request to fortify forgot password route.
         * Send Email with reset password link.
         */
        forgotPassword: builder.mutation<void, {email: string}>({
            query: (payload) => ({
                url: `forgot-password`,
                method: 'POST',
                body: payload
            }),
        }),

        /**
         * Update user's password by token from email reset link.
         */
        resetPassword: builder.mutation<void, {
            email: string,
            token: string,
            password: string,
            password_confirmation: string,
        }>({
            query: (payload) => ({
                url: `reset-password`,
                method: 'POST',
                body: payload
            }),
        }),
    })
});

export const {
    useGetUserQuery,
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation
} = authApi;