import { getFirestore, collection, doc, updateDoc } from "firebase/firestore";
import { app } from "@/firebase";

export async function updateApiInfoEnabledStatus(apiInfoId: string, enabled: boolean) {
    console.log("🔍 updateApiInfoEnabledStatus called with apiInfoId: ", apiInfoId, "enabled: ", enabled);
    try {
        const db = getFirestore(app);
        const apiInfoCollection = collection(db, 'apiInfo');
        const apiInfoDoc = doc(apiInfoCollection, apiInfoId);
        await updateDoc(apiInfoDoc, { enabled: enabled });

        //delay for 3 second
        await new Promise((resolve) => setTimeout(resolve, 4000));

        console.log("🔍 updateApiInfoEnabledStatus doc updated successfully");
        return true;
    } catch (error) {
        console.error("❌ Error in updateApiInfoEnabledStatus: ", error);
        return false;
    }
}