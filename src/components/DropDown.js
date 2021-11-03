import React from "react";

function DropDown({ optionList, onChange, name }) {
	const handleChange = (e) => {
		onChange(e, name);
	};

	return <select onChange={handleChange}>{optionList}</select>;
}

export default DropDown;
