// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL_API} from '~const/index';

// Define a service using a base URL and expected endpoints
export const memberTypeApi = createApi({
  reducerPath: 'memberType',
  baseQuery: fetchBaseQuery({baseUrl: BASE_URL_API}),
  endpoints: builder => ({
    getAllMemberType: builder.query<any, void>({
      query: () => 'member_types',
      transformResponse: (response: any, meta, arg) => response.data,
    }),
  }),
});

// auto-generated based on the defined endpoints
export const {useGetAllMemberTypeQuery} = memberTypeApi;
