export const SELECT_ALL_FUNDS =
  'SELECT ticker, name, asset_class AS assetClass, manager, aum, nav, status FROM funds ORDER BY name';

export const SELECT_FUND_BY_TICKER =
  'SELECT ticker, name, asset_class AS assetClass, manager, aum, nav, status FROM funds WHERE ticker = ?';

export const SELECT_FUND_COUNT = 'SELECT COUNT(*) AS total FROM funds';

export const SELECT_FUND_TOTAL_AUM =
  'SELECT COALESCE(SUM(aum_millions), 0) AS totalAumMillions FROM funds';
