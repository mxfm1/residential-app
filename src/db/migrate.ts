import { migrate} from 'drizzle-orm/postgres-js/migrator'
import { database, pg } from '.'

async function main(){
    try{
        await migrate(database,{migrationsFolder: "drizzle"})
        console.log("Migraciones ejecutadas con éxito")
    }
    catch(error){
        console.log("Hubo un error al ejecutar las migraciones:", error)
    }finally{
        await pg.end()
    }
}

main()