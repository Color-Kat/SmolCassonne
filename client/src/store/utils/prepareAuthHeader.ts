import {RootState} from "@/store";
import Cookies from 'js-cookie';

export const prepareAuthHeader = (headers: any, { getState, endpoint }: any) => {
    const CSRF_token = Cookies.get('XSRF-TOKEN');

    if (CSRF_token && endpoint !== 'refresh')
        headers.set('X-XSRF-TOKEN', CSRF_token);

    // For laravel API to disable redirects and enable JSON response
    headers.set('Accept', 'application/json');

    return headers;
}