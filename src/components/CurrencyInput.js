import React from "react";

function CurrencyInput({ value, onChange, name }) {
	return (
		<div className="from-currency-section currency-section">
			<input
				type="number"
				className="input-number"
				value={value}
				onChange={onChange}
				name={name}
			/>
		</div>
	);
}

export default CurrencyInput;
