import Card from "@/components/UI/Card";
import CardContent from "@/components/UI/CardContent";
import AcademicIcon from "@/icons/AcademicIcon";
import Icon from "@/icons/Icon";
import Link from "next/link";
import Image from "next/image";
import user_avatar from '@/public/user_avatar.jpeg';

export default async function Author({ data, ...props }) {
  if (!data.profile) {
    return <h1>Author not found!!!</h1>;
  }
  return (
    <Card {...props}>
      <CardContent className="flex flex-row flex-nowrap gap-2">
        <div className="grow">
          <h1>
            {data.profile.lastName}
            {data.profile.lastName && ", "}
            {data.profile.firstName} {data.profile.middleName || ""}
            {/* {data.profile.title && ","} {data.profile.title || ""} */}
          </h1>
          <div className="flex text-lg flex-row items-center">
            <Icon width="30" height="30">
              <AcademicIcon />
            </Icon>
            <Link className="ml-3 link" href={`/dept/${data.dept}`}>
              {data.dept}
            </Link>
          </div>

          <div className="group mt-2 relative">
            {data.llm ||
              `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus ea rerum suscipit alias. Et nulla ut blanditiis sit quam. Quaerat architecto autem ipsum quidem odio ducimus ex vitae, ea a. Error quo minima voluptatibus alias perferendis maiores consequatur. At consequuntur dolore labore maiores deleniti reiciendis autem id ab nesciunt exercitationem vitae!`}
            <span style={{bottom: "90px",right: "30px"}} className="absolute group-hover:opacity-100 opacity-0 bg-zinc-700  m-auto  py-1 px-2 rounded-md transition-opacity duration-300">
              This is AI generated text
            </span>
          </div>
        </div>
        <div className="max-md:hidden grow-0 shrink-0 w-40 max-h-[30] rounded-md bg-slate-400">
          {data.profile.img ? (
            <img
              src={data.profile.img}
              alt="Selected"
              className="hidden md:flex items-center justify-center w-40 h-full rounded-md bg-slate-400 object-cover"
            />
          ) : (
            <div className="hidden md:flex items-center justify-center  w-40 h-full rounded-md bg-slate-400 object-cover ">
              {/* there is no profile image! */}
              <Image
                src={user_avatar}
                alt="Selected"
                className="hidden md:flex items-center justify-center w-40 h-full rounded-md bg-slate-400 object-cover"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// async function Author({ data, ...props }) {
// 	if (!data.profile) {
// 		return <h1>Author not found!!!</h1>;
// 	}
// 	return (
// 		<Card {...props}>
// 			<h1 className="text-5xl font-semibold text-neutral-700">
// 				{data.profile.lastName}
// 				{data.profile.lastName && ", "}
// 				{data.profile.firstName} {data.profile.middleName}
// 				{/* {data.profile.title && ","} {data.profile.title || ""} */}
// 			</h1>
// 			<div className="flex flex-row justify-between pr-0">
// 				<div>
// 					<div className="flex text-lg flex-row items-center mt-5">
// 						<svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30">
// 							<path d="M479-120 189-279v-240L40-600l439-240 441 240v317h-60v-282l-91 46v240L479-120Zm0-308 315-172-315-169-313 169 313 172Zm0 240 230-127v-168L479-360 249-485v170l230 127Zm1-240Zm-1 74Zm0 0Z" />
// 						</svg>
// 						<Link
// 							className="ml-3 border-y-2 border-transparent hover:border-b-sky-800 transition-all"
// 							href={/dept/${data.dept}}
// 						>
// 							{data.dept}
// 						</Link>
// 					</div>
// 					<div className="flex text-lg flex-row items-center mt-2">
// 						<svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30">
// 							<path d="M140-80q-24 0-42-18t-18-42v-480q0-24 18-42t42-18h250v-140q0-24 18-42t42.411-18h59.178Q534-880 552-862t18 42v140h250q24 0 42 18t18 42v480q0 24-18 42t-42 18H140Zm0-60h680v-480H570v30q0 28-18 44t-42.411 16h-59.178Q426-530 408-546t-18-44v-30H140v480Zm92-107h239v-14q0-18-9-32t-23-19q-32-11-50-14.5t-35-3.5q-19 0-40.5 4.5T265-312q-15 5-24 19t-9 32v14Zm336-67h170v-50H568v50Zm-214-50q22.5 0 38.25-15.75T408-418q0-22.5-15.75-38.25T354-472q-22.5 0-38.25 15.75T300-418q0 22.5 15.75 38.25T354-364Zm214-63h170v-50H568v50ZM450-590h60v-230h-60v230Zm30 210Z" />
// 						</svg>
// 						<span className="ml-3">Author ID: {data.scopusID}</span>
// 					</div>
// 				</div>
// 				<div>
// 					<div className="flex flex-row items-center mt-5">
// 						<svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30">
// 							<path d="M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm340-302L140-685v465h680v-465L480-462Zm0-60 336-218H145l335 218ZM140-685v-55 520-465Z" />
// 						</svg>
// 						<a
// 							className="ml-3 whitespace-nowrap border-y-2 border-transparent hover:border-b-sky-800 transition-all"
// 							href={mailto://${data.profile.email.trim()}}
// 						>
// 							E-mail: {data.profile.email.trim()}
// 						</a>
// 					</div>
// 					<div className="flex flex-row items-center mt-2">
// 						<svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30">
// 							<path d="M795-120q-122 0-242.5-60T336-336q-96-96-156-216.5T120-795q0-19.286 12.857-32.143T165-840h140q13.611 0 24.306 9.5Q340-821 343-805l27 126q2 14-.5 25.5T359-634L259-533q56 93 125.5 162T542-254l95-98q10-11 23-15.5t26-1.5l119 26q15.312 3.375 25.156 15.188Q840-316 840-300v135q0 19.286-12.857 32.143T795-120ZM229-588l81-82-23-110H180q0 39 12 85.5T229-588Zm369 363q41 19 89 31t93 14v-107l-103-21-79 83ZM229-588Zm369 363Z" />
// 						</svg>
// 						<a
// 							className="ml-3 border-y-2 border-transparent hover:border-b-sky-800 transition-all"
// 							href={tel://${data.profile.mobile}}
// 						>
// 							Phone No.: {data.profile.mobile}
// 						</a>
// 					</div>
// 				</div>
// 			</div>
// 		</Card>
// 	);
// }