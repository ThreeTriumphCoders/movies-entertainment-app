export const getCategoryNameFromAPIName = (apiName: string): string => {
  switch (apiName) {
    case 'movie':
      return 'Movie'
    case 'tv':
      return 'TV Serie'
    default:
      return apiName;
  }
}