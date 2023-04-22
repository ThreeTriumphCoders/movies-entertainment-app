import { useRef } from "react";
import { MoviesList } from "~/components/MoviesList";
import { useGetPopularSeries } from "~/utils/use-queries";

const SeriesPage = () => {
  const [popularSeries, getPopularSeries] = useGetPopularSeries();
  const page = useRef(1);

  const loadMoreSeries = async () => {
    page.current += 1;
    await getPopularSeries(page.current);
  };

  return (
    <>
      <MoviesList 
        movies={popularSeries}
        title="Popular series"
        category="TV Serie"
        apiPath='tv'
      />

      <div className="flex justify-center">
        <button
          onClick={() => void loadMoreSeries()}
          className="rounded-lg bg-primary px-8 py-2 text-dark"
        >
          Load more
        </button>
      </div>
    </>
  );
};

export default SeriesPage;
