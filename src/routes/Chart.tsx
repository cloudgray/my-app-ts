import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts"
import { getValue } from "@testing-library/user-event/dist/utils";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface IChartProps {
  coinId: string;
}

function Chart({ coinId }: IChartProps) {
  const isDark = useRecoilValue(isDarkAtom)
  const {isLoading, data} = useQuery<IHistorical[]>(
    ["ohlcv", coinId], 
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 5000,
    }
  );
  return (
    <div>{
      isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart 
          type="line" 
          series={[
            {
              name: "Price",
              data: data?.map(price => price.close),
            }
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light"
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false
              },
              background: "transparent",
            },
            stroke: {
              curve: "smooth",
              width: 3
            },
            grid: {
              show: false,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: {show: false},
              axisTicks: {show: false},
              labels: {show: false},
              type: "datetime",
              categories: data?.map(price => price.time_close),
            },
            fill: {
              type: "gradient", 
              gradient: { gradientToColors: ["#1E9600", "#FFF200"], stops: [0, 100] },
            },
            colors: ["#FF0000"],
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(3)}`,
              }
            }
          }}
        />
      )}
    </div>
  );
}

export default Chart;

