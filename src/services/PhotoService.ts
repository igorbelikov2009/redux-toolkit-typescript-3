import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IPhoto } from "../models/types";

export const photoAPI = createApi({
  reducerPath: "photoAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["Photo"],
  endpoints: (builder) => ({
    // Эндпоинт получения всех фото, для получения их количества:___
    fetchAllPhoto: builder.query<IPhoto[], number | void>({
      query: () => ({
        url: "/photos",
      }),
    }),
    // Эндпоинт получения фото постранично - делаем пагинацию:___
    getAllPhotoByPage: builder.query<IPhoto[], number | void>({
      // Для пагинации соблюдаем последовательность page и limit
      query: (page: number = 1, limit: number = 10) => ({
        url: "/photos",
        params: {
          // Для пагинации соблюдаем последовательность page и limit
          _page: page,
          _limit: limit,
        },
      }),
      providesTags: (result) => ["Photo"],
    }),
    // Эндпоинт создания фото:___
    createPhoto: builder.mutation<IPhoto, IPhoto>({
      query: (photo) => ({
        url: "/photos",
        method: "POST",
        body: photo,
      }),
      invalidatesTags: ["Photo"],
    }),
    // Эндпоинт обновления фото:___
    updatePhoto: builder.mutation<IPhoto, IPhoto>({
      query: (photo) => ({
        url: `/photos/${photo.id}`,
        method: "PUT",
        body: photo,
      }),
      invalidatesTags: ["Photo"],
    }),
    // Эндпоинт удаления фото:___
    deletePhoto: builder.mutation<IPhoto, IPhoto>({
      query: (photo) => ({
        url: `/photos/${photo.id}`,
      }),
      invalidatesTags: ["Photo"],
    }),
  }),
});

//
// Нам необходимо зарегистрировать редюсер в store.ts
// и, там же, добавить мидлвеер из нашего photoAPI
