import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useAuth } from "./useAuth";
import {
  fetchPostFavorite,
  fetchDelFavorite,
} from "../store/slices/favorite/postDelFavoriteSlice";
import {
  fetchFavorites,
  selectFavorites,
} from "../store/slices/favorite/getFavoritesSlice";

export const useFavorite = (movieId: number | undefined) => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();
  const allFavorites = useAppSelector(selectFavorites);
  const [isOpenModalAuth, setIsOpenModalAuth] = useState(false);

  const isFavorite =
    movieId && isAuth
      ? allFavorites.some((f) => String(f.id) === String(movieId))
      : false;

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchFavorites());
    }
  }, [isAuth, dispatch]);

  const handleFavorite = async () => {
    if (!isAuth) {
      setIsOpenModalAuth(true);
      return;
    }
    if (!movieId) return;

    try {
      if (isFavorite) {
        await dispatch(fetchDelFavorite(movieId)).unwrap();
      } else {
        await dispatch(fetchPostFavorite(movieId)).unwrap();
      }
      await dispatch(fetchFavorites());
    } catch (err) {
      console.error("Ошибка при добавлении в избранное", err);
    }
  };

  return {
    isFavorite,
    handleFavorite,
    isOpenModalAuth,
    setIsOpenModalAuth,
  };
};
