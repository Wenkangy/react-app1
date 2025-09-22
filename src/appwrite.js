import { Client, ID, TablesDB, Query } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
  .setEndpoint('https://sfo.cloud.appwrite.io/v1') // Your Appwrite Endpoint
  .setProject('68cf4b40001c58702f88');


const tablesDB = new TablesDB(client);

export const updateSearchCount = async (searchTerm, movie) => {

  /*const promise = tablesDB.createRow({
    DATABASE_ID,
    tableId: 'metrics',
    rowId: ID.unique(),
    data: { searchTerm: "Hamlet" }
});

promise.then(function (response) {
    console.log(response);
}, function (error) {
    console.log(error);
}); */

    try {

        const result = await tablesDB.listRows(
            DATABASE_ID,
            COLLECTION_ID,
            [Query.equal('searchTerm', searchTerm)]
        );

        if (result.total &&  result.total > 0) {
            const row = result.rows[0];
            await tablesDB.updateRow(
                DATABASE_ID,
                COLLECTION_ID,
                row.$id,
                { count: row.count + 1 }
            )
        }
        else
        {
            await tablesDB.createRow({
                databaseId: DATABASE_ID,
                tableId: COLLECTION_ID, 
                rowId: ID.unique(),
                data: { searchTerm: searchTerm, 
                    count: 1,
                    movie_id: movie.id,
                    poster_url:`https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                    }
            });
        }

        
    } catch (error) {
        console.error(error);
    }

   
};