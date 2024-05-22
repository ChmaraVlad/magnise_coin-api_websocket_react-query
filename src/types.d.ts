export interface ChainAddress {
  chain_id: string;
  network_id: string;
  address: string;
}

export interface IExchangeResponse {
  asset_id_base: string
  asset_id_quote: string
  rate: number
  time: string
}
export interface IExchangeHistoryResponse {
  price_close: number
  price_high: number
  price_low: number
  price_open: number
  trades_count: number
  volume_traded: number
  time_close: Date
  time_open: Date
  time_period_end: Date
  time_period_start: Date
}

export interface CryptoAssetData {
  asset_id: string;
  name: string;
  type_is_crypto: number;
  data_quote_start: string; // ISO 8601 date-time string
  data_quote_end: string; // ISO 8601 date-time string
  data_orderbook_start: string; // ISO 8601 date-time string
  data_orderbook_end: string; // ISO 8601 date-time string
  data_trade_start: string; // ISO 8601 date-time string
  data_trade_end: string; // ISO 8601 date-time string
  data_symbols_count: number;
  volume_1hrs_usd: number;
  volume_1day_usd: number;
  volume_1mth_usd: number;
  price_usd: number;
  id_icon: string;
  supply_current: number;
  supply_total: number;
  supply_max: number;
  chain_addresses: ChainAddress[];
  data_start: string;
  data_end: string;
}