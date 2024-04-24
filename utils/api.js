export default async function api(url) {
	return (await fetch(`/api${url}`, { next: {revalidate: 0} })).json();
}

