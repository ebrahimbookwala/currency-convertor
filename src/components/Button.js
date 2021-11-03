import React from "react";

function Button({ text, onClick }) {
	return (
		<button className="refresh-div" onClick={onClick}>
			{text}
		</button>
	);
}

export default Button;
