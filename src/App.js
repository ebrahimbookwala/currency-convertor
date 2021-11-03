import "./App.css";
import { useEffect, useState } from "react";
import CurrencyInput from "./components/CurrencyInput";
import Spinner from "./components/Spinner";
import TimeAgo from "./components/TimeAgo";
import Button from "./components/Button";
import DropDown from "./components/DropDown";
import { formatDistanceToNow } from "date-fns";

const API_KEY = "9b20196ff6396d258febcfc5f97a1ba9";

function App() {
	const [currencyList, setCurrencyList] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [timeStamp, setTimeStamp] = useState("");
	const [data, setData] = useState({
		firstSum: 0,
		firstCurrency: "AED",
		secondSum: 0,
		secondCurrency: "AED",
	});

	const fetchCurrencyData = async () => {
		try {
			const response = await fetch(
				`http://api.exchangeratesapi.io/v1/latest?access_key=${API_KEY}`
			);

			if (!response.ok) {
				throw new Error(`HTTP ERROR! status : ${response.status}`);
			}
			const formatData = await response.json();

			setIsLoading(false);
			setCurrencyList((prev) => formatData.rates);
			setTimeStamp(formatData.date);
		} catch (e) {
			console.log("There has been a problem. Pls try again." + e.message);
			setIsLoading(true);
		}
	};

	useEffect(() => {
		setIsLoading(true);
		fetchCurrencyData();
	}, [setIsLoading, setCurrencyList]);

	const optionList = Object.keys(currencyList).map((curr) => (
		<option key={curr} value={curr}>
			{curr}
		</option>
	));

	const addToData = (e, name) => {
		if (name === "firstCurrency") {
			const convertedAmount =
				(data.firstSum / currencyList[e.target.value]) *
					currencyList[data.secondCurrency] || 0;

			setData((prev) => ({
				...prev,
				[name]: e.target.value,
				secondSum: convertedAmount,
			}));
		} else if (name === "secondCurrency") {
			const convertedAmount =
				(data.secondSum / currencyList[e.target.value]) *
					currencyList[data.firstCurrency] || 0;

			setData((prev) => ({
				...prev,
				[name]: e.target.value,
				firstSum: convertedAmount,
			}));
		}
	};

	const changeSecondSum = (e) => {
		const amountEntered = e.target.value;

		const convertedAmount =
			(amountEntered / currencyList[data.firstCurrency]) *
			currencyList[data.secondCurrency];

		setData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
			secondSum: convertedAmount,
		}));
	};

	const changeFirstSum = (e) => {
		const amountEntered = e.target.value;

		const convertedAmount =
			(amountEntered / currencyList[data.secondCurrency]) *
			currencyList[data.firstCurrency];

		setData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
			firstSum: convertedAmount,
		}));
	};

	const timeAgo = timeStamp && formatDistanceToNow(new Date(timeStamp));

	return (
		<div className="App">
			<header className="App-header">
				<h1>Live Currency Convertor</h1>
			</header>

			{isLoading ? (
				<Spinner />
			) : (
				<section className="main-body">
					<div className="first-section flex-section">
						<CurrencyInput
							onChange={changeSecondSum}
							value={data.firstSum}
							name="firstSum"
						/>
						<DropDown
							optionList={optionList}
							onChange={addToData}
							name="firstCurrency"
						/>
					</div>
					<div className="second-section flex-section">
						<CurrencyInput
							onChange={changeFirstSum}
							value={data.secondSum}
							name="secondSum"
						/>
						<DropDown
							optionList={optionList}
							onChange={addToData}
							name="secondCurrency"
						/>
					</div>
					<div>
						<Button onClick={() => fetchCurrencyData()} text="Refresh" />
						<TimeAgo timeAgo={timeAgo} />
					</div>
				</section>
			)}
		</div>
	);
}

export default App;
