const variants = {
	outlined: "text-center inline-block py-2 px-3 border-2 border-inset border-blue-500 rounded-md",
	filled: "text-center inline-block py-2 px-3 bg-blue-600 border-2 border-blue-600 text-white rounded-md"
}

export default function Button({ className = "", variant="outlined" , component = "button", children, ...props }) {
	let C = component
	return (
		<C className={variants[variant] + " " + className} {...props}>
			{children}
		</C>
	);
}
