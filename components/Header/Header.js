import { auth } from "@/app/auth";
import { getAuthor } from "@/utils/mongo";
import Link from "next/link";

export default async function Header({ className = "" }) {
	const session=await auth();
	let author;
	if(session && session.user && session.user.email && session.role==="Author" && session.scopusID){
		author=await getAuthor(session.scopusID);
	}
	return (
		<div id="Header" className={className}>
			<Link href="/" className="text-4xl flex items-center">
				<img src="/Panjab_University_logo.png" className="h-12 mr-4" alt="PU Logo" />
				<div style={{display: "flex",justifyContent: "start",alignItems:"start",gap: "2px"}}>
					<p className="gradient-text">PU RIMS</p>
					<p className="gradient-text" style={{fontSize: "10px",letterSpacing: "1px"}}>beta</p>
				</div>
			</Link>
			<div style={{display: "flex",justifyContent:"center",alignItems:"center"}}>
				<Link className="mr-6" href={"/dept"}>
					Faculties
				</Link>
				<Link className="mr-6" href={"/author"}>
					Authors
				</Link>
				<Link className="mr-6" href={"/shodhganga"}>
					Shodhganga
				</Link>
				{/* <Link className="mr-6" href={"/dept"}>
					Departments
				</Link> */}
				<Link className="mr-6" href={"/document"}>
					Documents
				</Link>
				<Link className="mr-6" href={"/projects"}>
					Projects
				</Link>
				<Link className="mr-6" href={"/report"}>
					Reports
				</Link>
				{(session && session.user && session.user.email) && <div className="profile-click">
					<div className="profile-avatar">
						{(session.scopusID && session.role==="Author" && author && author.profile.img) && <img src={author.profile.img} className="profile-avatar"></img>}
						{(session.scopusID && session.role==="Author" && !author.profile.img) && <img src={'/user_avatar.jpeg'} className="profile-avatar"></img>}
						{!(session.scopusID && (session.role==="Author")) && <img src={'/user_avatar.jpeg'} className="profile-avatar"></img>}
						<div className="profile-display">
							<div className="profile-dropdown">
								<div className="profile-dropdown-avatar">
									<div className="profile-avatar">
										{(session.scopusID && session.role==="Author" && author && author.profile.img) && <img src={author.profile.img} className="profile-avatar"></img>}
										{(session.scopusID && session.role==="Author" && !author.profile.img) && <img src={'/user_avatar.jpeg'} className="profile-avatar"></img>}
										{(session.scopusID && (session.role!=="Author")) && <img src={'/user_avatar.jpeg'} className="profile-avatar"></img>}
									</div>
									<div className="profile-name">
										{(!author && session.role==="Super_Admin") && <p>Admin</p>}
										{author && author.profile && <p>{author.profile.firstName?author.profile.firstName:""} {author.profile.lastName?author.profile.lastName:""}</p>}
										<p>{session.user.email}</p>
									</div>
								</div>
								{(session.scopusID && session.role==="Author") && <>
									<Link href={`/author/${session.scopusID}`}>
										<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
											<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
											<path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
										</svg>
										My Profile
									</Link>
									<Link href={`/author/${session.scopusID}/update`}>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
											<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
											<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
										</svg>
										Edit Profile
									</Link>
								</>}
								<Link href={'/user/signout'}>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
										<path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
										<path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
									</svg>
									Log Out
								</Link>
							</div>
							<div className="profile-triangle"></div>
						</div>
					</div>
				</div>}
				{!(session && session.user && session.user.email) && <Link href={"/user/login"}>Login</Link>}
			</div>
		</div>
	);
}
