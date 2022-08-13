import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query';
import {BASE_URL_API} from '~const/index';
import type {RootState} from '../store';
import {store} from '../store';
import {setLogout} from '~redux/reducer/authRtk';
const accessToken = '';

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL_API,
  prepareHeaders: (headers, {getState}) => {
    // const {
    //   auth: {
    //     user: {accessToken},
    //   },
    // } = getState() as RootState;
    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // const refreshResult = await baseQuery('token/refresh/', api, extraOptions);

    // if (refreshResult.data) {
    //   store.dispatch(tokenUpdated({ accessToken: refreshResult.data as string }));

    //     // retry the initial query
    //     result = await baseQuery(args, api, extraOptions);
    // } else {
    //   store.dispatch(logout());
    // }

    store.dispatch(setLogout());
  }
  return result;
};
