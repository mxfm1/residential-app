import { getProfileImageFullUrl } from '@/app/(content)/user/perfil/actions'
import { Avatar } from '@/components/ui/avatar'
import { getUserProfileUseCase } from '@/use-cases/profile'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import Image from 'next/image'

export default async function ProfileAvatar({userId,className}:{userId:number,className?:string}){

    const profile = await getUserProfileUseCase(userId)

    return (
        <Avatar className={className}>
            <AvatarImage src={getProfileImageFullUrl(profile)} className='object-cover w-full h-full' width={40} height={50} />
            <AvatarFallback className='flex items-center justify-center w-full'>
                {/* {profile.name.substring(0,2).toUpperCase() ?? "Loading.."} */}
                <Image src="/profile-png.png" width={40} height={40} alt='profile-image'/>
                {/* <div className=''>
                    <Loader className=""/>
                </div> */}
            </AvatarFallback>
        </Avatar>
    )
}