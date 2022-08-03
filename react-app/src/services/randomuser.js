import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  API_URL, noOfUsers, seed, nationalities
} from '../config/config';

export const randomuserApi = createApi({
  reducerPath: 'randomuserApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getRandomusers: builder.query({
      query: () => `/?results=${noOfUsers}&seed=${seed}&nat=${nationalities}`,
    }),
  }),
});

export const { useGetRandomusersQuery } = randomuserApi;
