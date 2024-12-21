import { create } from 'zustand';
import { getCurrentUser } from './lib/session';

type AuthStoreProps = {
    userId: number | null;
    setUserId: (userId:number | null) => void;
    asyncGetUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStoreProps>((set) => ({
    userId: null,
    setUserId: (userId) => set({userId}),
    asyncGetUser: async() => {
        try{
            const user = await getCurrentUser()
            set({userId: user?.id ?? null})
        }catch(error){
            console.error('Hubo un error al obtener al usuario..')
            set({userId:null})
        }
    }
}))