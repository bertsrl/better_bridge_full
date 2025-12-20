import { app } from "@/firebase";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";

/**
 * @async @function getApiInfo
 * @description fn that will get all the api infos from the database based on the endpoint we created
 */
async function getApiInfo(endpoint: string) {
    console.log('🔍 getApiInfo called with endpoint:', endpoint);
    console.log('🔍 app:', app);

    const db = getFirestore(app);
    console.log('🔍 db:', db);
    
    const apiInfoCollection = collection(db, 'apiInfo');
    console.log('🔍 apiInfoCollection:', apiInfoCollection);
    const q = query(apiInfoCollection, where('endpoint', '==', endpoint));
    
    console.log('🔍 q:', q);
    const apiInfo = await getDocs(q);
    console.log('🔍 apiInfo docs:', apiInfo.docs);

    return apiInfo.docs.map((doc) => doc.data());
}

export { getApiInfo };