'use server'

import { useAuthValidation } from "@/lib/test-validation-component"
import Test from "../_components/test-modal"
import { useAuthModal } from "@/context/auth-modal"
import { CourseCard, CourseCardAuthor, CourseCardBody, CourseCardCategory, CourseCardRating, CourseCardTitle } from "@/components/card/course-card"

export default async function HomePage(){

    const user = await useAuthValidation()

    console.log("USER DATA",user)

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-5">
            <CourseCard href="/courses/web-dev">
                <CourseCardBody className="rounded-xl">
                    <CourseCardTitle title="Curso Desarrollo web"/>
                    <CourseCardCategory category="*web development" />
                    <CourseCardRating value={4.5}/>
                    <CourseCardAuthor author="Luis Hernandez" />
                </CourseCardBody>
            </CourseCard>
        </div>
    )
}