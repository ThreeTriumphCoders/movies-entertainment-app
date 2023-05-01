type Props = {
  title: string;
};

export const MoviesListMockup = ({ title }: Props) => {
  return (
    <section className="mb-6 pb-8 sm:mb-10">
      <h2 className="mb-6 text-xl sm:text-[32px] lg:mb-10">{title}</h2>

      <div
        className="
          grid grid-cols-2 gap-4 sm:grid-cols-3 
          sm:gap-x-7 sm:gap-y-6 xl:grid-cols-4 xl:gap-x-10 xl:gap-y-8
        "
      >
        {[...Array(12).keys()].map((num) => (
          <div
            key={JSON.stringify(num)}
            className="min-w-[140px] sm:min-w-[180px] lg:min-w-[250px]"
          >
            <div
              id="image-container"
              className="relative mb-2 overflow-hidden rounded-lg pt-[56.25%]"
            >
              <div className="absolute bottom-[1px] left-[1px] right-[1px] top-[1px] animate-pulse  bg-semi-dark" />
            </div>

            <div className="mb-1 h-[14px] w-1/4 animate-pulse rounded-sm bg-semi-dark sm:h-4" />

            <div className="h-[18px] w-2/3 animate-pulse rounded-sm bg-semi-dark sm:h-6" />
          </div>
        ))}
      </div>
    </section>
  );
};
