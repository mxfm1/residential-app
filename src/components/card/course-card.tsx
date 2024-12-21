import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

export const CourseCard = ({children,href}:{children:ReactNode,href:string;}) => {
    return (
        <Link className="rounded-xl shadow-xl bg-background min-w-46" href={href}>
            {children}
        </Link>
    )
}

export const CourseCardImageUrl = ({src,alt}:{src:string,alt?:string}) => {
    return (
        <div className="rounded-t-xl overflow-hidden">
            <img src={src} alt={alt} className="w-full h-auto object-cover"/>
        </div>
    )
}

export const CourseCardTitle = ({title}:{title:string}) => {
    return <h2 className="text-xl font-bold mt-2">{title}</h2>
}

export const CourseCardCategory = ({ category }: { category: string }) => (
    <p className="text-sm text-muted-foreground mt-1">{category}</p>
  );
  
export const CourseCardRating = ({ value }: { value: number }) => (
    <div className="flex items-center gap-1 mt-2">
      <span className="text-yellow-500">⭐</span>
      <span>{value}</span>
    </div>
  );
  
export const CourseCardAuthor = ({ author }: { author: string }) => (
    <p className="text-sm text-muted-foreground mt-2 italic">{author}</p>
  );

export const CourseCardBody = ({children,className}:{children:ReactNode,className?:string}) => {
    return (
        <div className={cn("p-4 bg-background",className)}>
            {children}
        </div>
    )
}