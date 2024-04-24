export default function Card({ className = "", children, component = "div", ...props }) {
	let C = component
	return (
		<C className={"card " + className} {...props}>
			{children}
		</C>
	);
}
