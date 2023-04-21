import { type Bookmark } from "@prisma/client";
import { useCallback, useMemo } from "react";
import { createContext, type FC, useContext, useState, useEffect } from "react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

type BookmarksContextValue = {
  bookmarksIds: number[];
  isInBookmarks: (movieId: number) => boolean;
  addToBookmarks: (movieId: number) => void;
  deleteFromBookmarks: (movieId: number) => void;
};

const BookmarksContext = createContext<BookmarksContextValue | undefined>(
  undefined
);

interface BookmarksContextProviderProps {
  children: React.ReactNode;
}

export const BookmarksContextProvider: FC<BookmarksContextProviderProps> = ({
  children,
}) => {
  const { data: sessionData } = useSession();
  const { data: bookmarks = [], refetch } = api.bookmark.getAll.useQuery(
    undefined, 
    {
      enabled: sessionData?.user !== undefined,
    }
  );

  const newBookmarkIds = useMemo(() => {
    return bookmarks.map(({ movieId }) => movieId);
  }, [bookmarks]);

  const createBookmark = api.bookmark.create.useMutation({
    onSuccess: () => void refetch()
  });

  const deleteBookmark = api.bookmark.delete.useMutation({
    onSuccess: () => void refetch()
  });

  const addToBookmarks = useCallback((movieId: number) => {
    createBookmark.mutate({ movieId });
  }, []);

  const deleteFromBookmarks = useCallback((movieId: number) => {
    deleteBookmark.mutate({ movieId });
  }, []);

  const isInBookmarks = (movieId: number) => {
    return bookmarks.some((bookmark) => bookmark.movieId === movieId);
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarksIds: newBookmarkIds,
        isInBookmarks,
        addToBookmarks,
        deleteFromBookmarks,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
};

export const useBookmarksContext = () => {
  const bookmarksContext = useContext(BookmarksContext);

  if (bookmarksContext === undefined) {
    throw new Error("useBookmarksContext must be inside a BookmarksContext");
  }

  return bookmarksContext;
};
