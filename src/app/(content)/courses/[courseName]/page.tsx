import CourseDescriptionCard from "./_components/course-card";
import CourseDescriptionBanner from "./_components/course-info-banner,";

const courseDummyData = {
    routes: ["Informática","Redes y seguridad","Hacking ético"],
    title: "Hacking Etico a Dispositivos Móviles Android",
    description:"Aprende las técnicas que los Hackers utilizan para tener acceso a cualquier Dispositivo Movil. Aprende Hacking Etico",
    rating:4.2,
    author: "Thiago Araujo"
}

type CoursePageProps = {
    params: Promise<{courseName:string}>
};

export default async function CoursePage({params}:CoursePageProps){
    const resolvedParams = await params; 
    console.log("Resolved Params:", resolvedParams.courseName);

    const newCourseParam = ((await params).courseName)
    console.log(newCourseParam)

    return (
        <div className="relative h-screen">
            <div className="flex">
                <div className="absolute w-full">
                    <CourseDescriptionBanner {...courseDummyData}/>
                </div>
                <div className="flex flex-col lg:absolute lg:top-12 lg:left-2/3 w-full lg:w-0">
                    <CourseDescriptionCard isAuth={false}/>
                </div>
            </div>
        </div>
    )
}