export default function About() {
	return (
		<main id="main" className="grid-12 max-w-7xl mx-auto">
			<div className="col-span-12 text-center my-4">
				<div className="huge-text">
					<div style={{display: "flex",justifyContent: "center",alignItems: "center",gap: "10px"}}>
						<p>About</p>
						<div style={{display: "flex",justifyContent: "start",alignItems:"start",gap: "4px"}}>
							<p className="gradient-text">PU RIMS</p>
							<p className="gradient-text" style={{fontSize: "14px", letterSpacing: "1px"}}>beta</p>
						</div>
					</div>
				</div>
				<div className="mb-6 big-text">Panjab University Research Information Management System</div>
				<div className="big-text max-w-3xl m-auto">
					<div style={{display: "inline-block"}}>
						<div style={{display: "inline-block",marginRight: "8px"}}>
							<div style={{display: "flex",justifyContent: "start",alignItems:"start",gap: "4px"}}>
								<p className="gradient-text">PU RIMS</p>
								<p className="gradient-text" style={{fontSize: "10px", letterSpacing: "1px"}}>beta</p>
							</div>
						</div>
						<p style={{display: "inline"}}>collects all research statistics from various reputable sources, and displays it at a single, easy to access platform.</p>
					</div>
					<div style={{marginTop: "15px"}}>
						<p>Developed by,</p>
						<p>MAIVRIK Lab</p>
						<p>UIET</p>
						<p>Panjab University</p>
						<p>ML, AI, Vision & Robotics Incubation Cum Knowledge Lab</p>
					</div>
				</div>
			</div>
		</main>
	);
}
