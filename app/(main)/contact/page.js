import ContactPage from "./ContactPage";

export default function Contact() {
	return (
		<main id="main" className="grid-12 max-w-7xl mx-auto">
			<div className="col-span-12 text-center my-4">
				<div className="huge-text">
					<span className="gradient-text">Contact &nbsp;us</span>
				</div>
				<div className="mb-6 big-text m-auto">
					In case of any correction or query, feel free to contact us.
				</div>
				<ContactPage></ContactPage>
			</div>
		</main>
	);
}
