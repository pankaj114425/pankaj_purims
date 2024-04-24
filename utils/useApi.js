import { useEffect, useState } from "react";

export default function useFetch(url, options = {}) {
	let [data, setData] = useState([]);
	let [loading, setLoading] = useState(true);
	let [error, setError] = useState(false);

	useEffect(() => {
		setData([])
		setLoading(true)
		setError(false)
		fetch(`http://localhost:5500/api${url}`)
			.then((response) => response.json())
			.then((json) => {
				setData(json);
				setLoading(false);
			})
			.catch((err) => {
				setError(true);
			});
	}, [url]);

	return [data, loading, error];
}
