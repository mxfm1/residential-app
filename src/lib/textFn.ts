export const toUpperCase = (text:string | null) => {
    if(!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}