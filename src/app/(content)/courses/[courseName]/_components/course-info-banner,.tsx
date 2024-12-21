'use client'

type CourseDescriptionBannerProps = {
    routes:string[];
    title:string;
    description:string;
    rating:number
    author:string;
}

export default function CourseDescriptionBanner({routes,title,description,rating,author}:CourseDescriptionBannerProps){
    return (
        <div className="bg-card-foreground lg:h-80 md:fixed md:bottom-0 md:left-0 px-4 lg:px-12 lg:py-8 text-secondary w-full rounded-tr lg:rounded-none fixed bottom-0 left-0 lg:static ">
            <span className="hidden lg:block text-cyan-900 font-thin">{routes.join(" > ")}</span>
            <h1 className="text-xl md:text-xl lg:text-3xl mt-3 lg:mt-6">{title}</h1>
            <p className="hidden lg:block text-md md:text-xl mt-4 font-serif max-w-64 lg:max-w-[700px] mb-4">{description}</p>
            <span className="text-yellow-500">{rating}⭐</span>
            <p className="mt-2 lg:mt-4">Creado por {author}</p>
        </div>
    )
}