import { Loader } from "./Loader";

type Props = {
  onClick: () => void;
  isLoading: boolean;
}

const buttonClasses = `
  flex justify-center w-fit mx-auto
  rounded-lg transition
  bg-primary hover:bg-semi-dark 
  px-5 py-1 lg:px-6 lg:py-2
  sm:text-xl lg:text-2xl
  text-dark hover:text-light
`

export const LoadMoreButton = ({ onClick, isLoading }: Props) => (
  isLoading ? (
    <div className="relative mt-10">
      <Loader />
    </div>
  ) : (
    <button
      onClick={onClick}
      className={buttonClasses}
    >
      Load more
    </button>
  )
)