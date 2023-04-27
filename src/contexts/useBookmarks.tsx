import { type Bookmark } from "@prisma/client";
import { useCallback } from "react";
import { createContext, type FC, useContext, useState } from "react";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { type Category } from "~/types/Category.enum";

type BookmarksContextValue = {
  currentId: number | null;
  bookmarks: Bookmark[];
  isInBookmarks: (movieId: number) => boolean;
  addToBookmarks: (movieId: number, type: Category) => void;
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
  const [currentId, setCurrentId] = useState<number | null>(null);
  const { data: sessionData } = useSession();
  const { data: bookmarks = [], refetch } = api.bookmark.getAll.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: () => setCurrentId(null),
      onError: () => setCurrentId(null),
    }
  );

  const createBookmark = api.bookmark.create.useMutation({
    onSuccess: () => void refetch(),
  });

  const deleteBookmark = api.bookmark.delete.useMutation({
    onSuccess: () => void refetch(),
  });

  const addToBookmarks = useCallback((movieId: number, type: Category) => {
    setCurrentId(movieId);
    createBookmark.mutate({ movieId, type });
  }, []);

  const deleteFromBookmarks = useCallback((movieId: number) => {
    setCurrentId(movieId);
    deleteBookmark.mutate({ movieId });
  }, []);

  const isInBookmarks = (movieId: number) => {
    return bookmarks.some((bookmark) => bookmark.movieId === movieId);
  };

  return (
    <BookmarksContext.Provider
      value={{
        currentId,
        bookmarks,
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