import { useQuery } from "@tanstack/react-query"
import { IExchangeHistoryResponse } from "../../types"
import { useEffect, useRef } from "react"
import { setupD3 } from "../../helper/setupD3";


import Styles from './styles.module.scss'

const Chart = () => {
    const { isLoading, error, data } = useQuery({
    queryKey: ['assetsHistoricalData'],
    refetchInterval: false,
    queryFn: () =>
      fetch('https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_BTC_USD/history?period_id=1MTH&time_start=2016-01-01T00:00:00',
      {
        headers: { 
          'Accept': 'text/plain', 
          'X-CoinAPI-Key': 'FCB7EBC1-F285-4918-B7FF-07FE2D6843F2'
        }
      }
      ).then(async (res) => {
        const response: IExchangeHistoryResponse[] = await res.json()
        const transformed = response.map((item) => ({
          price: item.price_close,
          date: new Date(item.time_period_start)
        }))
        
        return transformed
        }
      ),
  })

  const svgRef = useRef(null);
  const chartMounted = useRef<null | boolean>(null);

    useEffect(() => {
      if(!data || chartMounted.current) return 

      if (svgRef.current) {
        try {
          setupD3(svgRef.current, data)
          chartMounted.current = true
        } catch (error) {
          console.log("🚀 ~ useEffect ~ error:", error)
        }
      }

    }, [data]);

  if (isLoading) return (
  <div>Loading...</div>
  )

  if (error) return (
    <div>
    {'An error has occurred: ' + error.message}
    </div>
  )

  return (
    <div className={Styles["chart__wrapper"]}>
      <div ref={svgRef} />
    </div>
  )
}

export default Chart
