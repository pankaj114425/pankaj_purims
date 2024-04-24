export default function CardContent({className = "", children, component="div", ...props}) {
	let C = component
	return (
		<C className={"p-4 " + className} {...props}>
			{children}
		</C>
	);
}
