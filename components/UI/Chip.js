import Icon from "@/icons/Icon";

export default function Chip({ className, component: C = "span", children, icon = null, ...props }) {
	return (
		<C className={"chip " + className} {...props}>
			<span>{children}</span>
			{icon && <Icon width="18" height="18">{icon}</Icon>}
		</C>
	);
}
