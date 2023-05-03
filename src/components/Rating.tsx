import classNames from 'classnames';

type Props = {
  title?: 'TMDB' | 'Movies Ent.';
  average: number;
};

export const Rating = ({ title, average }: Props) => (
  <div className="flex justify-between gap-5">
    {title && <p className="font-light">{title}</p>}

    <div className="flex items-center gap-1">
      <div
        className={classNames('h-2 w-2 rounded-full', {
          'bg-light': average === 0 || !average,
          'bg-[#3B931C]': average > 7.4,
          'bg-[#FFF961]': average > 4.9 && average < 7.5,
          'bg-[#E84545]': average < 5,
        })}
      />
      <p className="font-light">{(Math.round(average * 10) / 10).toFixed(1)}</p>
    </div>
  </div>
);
