export const configureOptions = (
  options: MedalAPI.LatestOptions | MedalAPI.SearchOptions | MedalAPI.TrendingOptions
) => {
  return {
    ...options,
    customStyleClass: options.customStyleClass ? options.customStyleClass.concat(' medal-js') : 'medal-js',
  };
};
