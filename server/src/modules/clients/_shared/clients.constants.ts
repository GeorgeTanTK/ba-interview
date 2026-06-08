export const SELECT_ALL_CLIENTS =
  'SELECT id, name, advisor, segment, aum, status FROM clients ORDER BY name';

export const SELECT_CLIENT_BY_ID =
  'SELECT id, name, advisor, segment, aum, status FROM clients WHERE id = ?';

export const SELECT_FUND_COUNT = 'SELECT COUNT(*) AS total FROM funds';

export const SELECT_FUND_TOTAL_AUM =
  'SELECT COALESCE(SUM(aum_millions), 0) AS totalAumMillions FROM funds';
