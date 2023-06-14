import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IPost } from "../models/types";

export const postAPI = createApi({
  reducerPath: "postAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    // Получение всех posts для вычисления значения totalCount для пагинации
    fetchAllPost: builder.query<IPost[], number | string | void>({
      query: (limit = "") => `posts?page:_page${limit && `_limit=${limit}`}`,
    }),
    // Получение постов постранично с учётом пагинации
    getPostByPage: builder.query<IPost[], number | string | void>({
      query: (page: number = 1, limit: number | string = "") => ({
        url: "/posts",
        params: {
          _page: page,
          _limit: limit,
        },
      }),
      providesTags: (result) => ["Post"],
    }),
    // Создание post: ___
    createPost: builder.mutation<IPost, IPost>({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),
    // Обновление todo: ___
    updatePost: builder.mutation<IPost, IPost>({
      query: (post) => ({
        url: "/posts",
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),
    // Удаление todo: ___
    deletePosts: builder.mutation<IPost, IPost>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

// Нам необходимо зарегистрировать редюсер в store.ts
// и, там же, добавить мидлвеер из нашего todoAPI
