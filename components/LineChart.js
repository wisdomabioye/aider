import { Line } from "react-chartjs-2";
import { monthlySummary, sumAmount, sumArrayNumber } from "../helpers/main";

const data = {
  labels: [],
  datasets: [
    {
      label: "Earning",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(33, 44, 64, 0.5)",
      borderColor: "#212c40",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "#212c40",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 2,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#212c40",
      pointHoverBorderColor: "#eee",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: []
    },
    {
      label: "Spending",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(64, 41, 33, 0.5)",
      borderColor: "#cc506b",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "#cc506b",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 2,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#cc506b",
      pointHoverBorderColor: "#eee",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: []
    }
  ]
};


export default function FinanceChart(props) {
	let {days = [], earnings = [], spendings = []} = monthlySummary(props.data || {});

	data["labels"] = days; 
	data["datasets"][0]["data"] = earnings;
	data["datasets"][1]["data"] = spendings;

	return (
		<div className="mt-4 mr-4 mb-4 ml-4" style={{maxWidth: "99%"}}>
      <p className="is-size-7">
        <strong>Total Earning:</strong> ${sumArrayNumber(earnings)} <br/>
        <strong>Total Spending:</strong> ${sumArrayNumber(spendings)}
      </p>
			<Line 
				data={data} 
				legend={{labels: {usePointStyle: true, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu"'}}}
				
			/>
		</div>
	)
}
