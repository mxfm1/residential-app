import { Profile } from "@/db/schema";
import { getProfileImageUrl } from "@/use-cases/users";

export function getProfileImageFullUrl(profile:Profile){
    return profile.imageId 
        ? getProfileImageUrl(profile.userId,profile.imageId)
        : profile.image 
        ? profile.image
        : "/profile-png.png"
}