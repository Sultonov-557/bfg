export function clearString(string: string) {
	const stringArray = string.split("");
	const filteredStringArray = stringArray.filter((v) => {
		if (!isNaN(+v) || v.toLowerCase() != v.toUpperCase()) return true;
		return false;
	});
	return filteredStringArray.join("");
}
