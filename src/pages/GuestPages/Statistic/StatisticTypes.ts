type TStatisticEntry = {
  clients_count: number;
  kka: { count: number; sum: number }
  kkn: { count: number; sum: number }
  total: { count: number; sum: number }
}

export type TStatisticTypes = {
  statisticData: null | TStatisticEntry;
}
