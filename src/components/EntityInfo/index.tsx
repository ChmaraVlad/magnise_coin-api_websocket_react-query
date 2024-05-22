import Styles from './styles.module.scss'
import { useEffect, useRef, useState } from "react";

interface BitcoinPriceData {
  price: number;
  lastUpdated: string;
}


const EntityInfo = () => {
  const [bitcoinPrice, setBitcoinPrice] = useState<BitcoinPriceData | null>(null);
  const [showPrice, setShowPrice] = useState(true);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket('wss://ws.coinapi.io/v1/');

      ws.onopen = () => {
        console.log('WebSocket connection opened');
        const subscriptionMessage = {
          type: 'hello',
          apikey: 'FCB7EBC1-F285-4918-B7FF-07FE2D6843F2',
          heartbeat: true,
          subscribe_data_type: ['trade'],
          subscribe_filter_asset_id: ['BTC'],
        };
        ws.send(JSON.stringify(subscriptionMessage));
      };

      ws.onmessage = (event: any) => {
        const data = JSON.parse(event.data);
        if (data.type === 'trade' && data.symbol_id === 'BINANCE_SPOT_BTC_FDUSD') {
          setBitcoinPrice({
            price: data.price,
            lastUpdated: new Date().toISOString(),
          });
          setShowPrice(false)
        }
      };

      ws.onerror = (error: any) => {
        console.error('WebSocket error:', error);
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
      };

      wsRef.current = ws;
    };

    if (showPrice) {
      connectWebSocket();
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [showPrice]);

    const formatDateTime = (dateTimeString: string, locale: string = 'en-US', timeZone: string = 'UTC'): string | null => {
    if(!dateTimeString) return null

    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone
    };
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString(locale, options);
  };

  return (
    <div className={Styles['market']}>
      <div className={Styles['market__header']}>
        <div className={Styles['market__asset']}>BTC/USD</div>
        <div className={Styles['market__subscribe']} onClick={() => setShowPrice(true)}>Subscribe</div>
      </div>
      <h3 className={Styles['market__title']}>Market data:</h3>
      <div className={Styles['market__body']}>
        <div className={Styles['market__symbol']}>
          <div className={Styles['market__property']}>Symbol:</div>
          <div className={Styles['market__value']}>BTC/USD</div>
        </div>
        <div className={Styles['market__price']}>
          <div className={Styles['market__property']}>Price:</div>
          <div className={Styles['market__value']}>{bitcoinPrice?.price}</div>
        </div>
        <div className={Styles['market__time']}>
          <div className={Styles['market__property']}>Time:</div>
          <div className={Styles['market__value']}>{bitcoinPrice?.lastUpdated ? formatDateTime(bitcoinPrice?.lastUpdated) : null}</div>
        </div>
      </div>
    </div>
  )
}

export default EntityInfo
