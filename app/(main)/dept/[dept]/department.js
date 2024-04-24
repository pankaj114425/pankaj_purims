import Card from "@/components/UI/Card";

export default async function Department({ data, ...props }) {
	if (!data.name) {
		return <h1>Department not found!!!</h1>;
	}
	return (
		<Card {...props}>
			<h1>
				{data.name}
				{/* {data.profile.title && ","} {data.profile.title || ""} */}
			</h1>
			{data.description || <>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus ea rerum suscipit alias. Et nulla ut
			blanditiis sit quam. Quaerat architecto autem ipsum quidem odio ducimus ex vitae, ea a. Error quo minima
			voluptatibus alias perferendis maiores consequatur. At consequuntur dolore labore maiores deleniti
			reiciendis autem id ab nesciunt exercitationem vitae unde eveniet praesentium, repellat, velit aut sint
			animi consectetur!</>}
		</Card>
	);
}