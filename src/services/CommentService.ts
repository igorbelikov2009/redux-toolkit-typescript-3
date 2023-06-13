import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IComment } from "../models/types";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["Comment"],
  endpoints: (builder) => ({
    fetchAllComments: builder.query<IComment[], number | string>({
      query: (limit: number | string = "") => `comments?${limit && `_limit${limit}`}`,
      // //==========================================================================
      // так тоже работает
      // query: (limit: number | string = "10") => ({
      //   url: "/comments",
      //   params: {
      //     _limit: limit,
      //   },
      // }),
      // //==========================================================================
      providesTags: (result) => ["Comment"],
    }),
    // Эндпоинт создания коммента:_____
    createComment: builder.mutation<IComment, IComment>({
      query: (comment) => ({
        url: "/comments",
        method: "POST",
        body: comment,
      }),
      invalidatesTags: ["Comment"],
    }),
    // Эндпоинт обновления коммента:_____
    updateComment: builder.mutation<IComment, IComment>({
      query: (comment) => ({
        url: `/comments/${comment.id}`,
        method: "POST",
        body: comment,
      }),
      invalidatesTags: ["Comment"],
    }),
    // Эндпоинт удаления коммента:_____
    deleteComment: builder.mutation<IComment, IComment>({
      query: (comment) => ({
        url: `/comments/${comment.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

// Нам необходимо зарегистрировать редюсер в store.ts
// и, там же, добавить мидлвеер из нашего commentAPI
