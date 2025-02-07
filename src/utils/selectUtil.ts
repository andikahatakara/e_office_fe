interface Option {
	[key: string]: any;
}
const getOptionLabel = (labelKey: string | string[], option: Option) => {
	if (typeof labelKey === "string") {
		return option[labelKey];
	} else if (Array.isArray(labelKey)) {
		return labelKey.reduce((acc, key) => (acc ? acc[key] : ""), option);
	}
	return "";
};

const getOptionValue = (valueKey: string | string[], option: Option) => {
	if (typeof valueKey === "string") {
		return option[valueKey];
	} else if (Array.isArray(valueKey)) {
		return valueKey.reduce((acc, key) => (acc ? acc[key] : ""), option);
	}
	return "";
};

export { getOptionLabel, getOptionValue };
