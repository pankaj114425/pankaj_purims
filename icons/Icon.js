export default function Icon({ children, width = "48", height = "48", ...props }) {
	return (
		<svg className={"icon"} xmlns="http://www.w3.org/2000/svg" height={height} viewBox="0 -960 960 960" width={width} {...props}>
			{children}
		</svg>
	);
}
