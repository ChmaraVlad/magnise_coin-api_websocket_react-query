import { useQuery } from "@tanstack/react-query"
import { CryptoAssetData } from "../../types"

const EntityInfo = () => {
    const { isLoading, error, data } = useQuery({
    queryKey: ['assetsData'],
    queryFn: () =>
      fetch('https://rest.coinapi.io/v1/assets',
      {
        headers: { 
          'Accept': 'text/plain', 
          'X-CoinAPI-Key': 'FCB7EBC1-F285-4918-B7FF-07FE2D6843F2'
        }
      }
      ).then(async (res) => {
        const data: CryptoAssetData[] = await res.json()

        return data.slice(0, 10)
        }
      ),
  })

  if (isLoading) return (
  <div>Loading...</div>
  )

  if (error) return (
    <div>
    {'An error has occurred: ' + error.message}
    </div>
  )

  console.log(data);
  
  return (
    <header>Header</header>
  )
}

export default EntityInfo