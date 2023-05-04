import classNames from 'classnames';
import { ThemeType } from '~/types/ThemeType';
import { useThemeContext } from '~/utils/ThemeContext';

type Props = {
  title?: 'TMDB' | 'Movies Ent.';
  average: number;
};

export const Rating = ({ title, average }: Props) => {
  const { themeType } = useThemeContext();
  const isThemeDark = themeType === ThemeType.Dark;

  return (
    <div className="flex justify-between gap-5">
      {title && <p className="font-light">{title}</p>}

      <div className="flex items-center gap-1">
        <div
          className={classNames('h-2 w-2 rounded-full', {
            'bg-grey': (average === 0 || !average) && !isThemeDark,
            'bg-light': (average === 0 || !average) && isThemeDark,
            'bg-[#3B931C]': average > 7.4,
            'bg-[#fff832]': average > 4.9 && average < 7.5,
            'bg-[#E84545]': average < 5,
          })}
        />
        <p className="font-light">
          {(Math.round(average * 10) / 10).toFixed(1)}
        </p>
      </div>
    </div>
  );
};
