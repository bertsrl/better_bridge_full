import { getFirestore, collection, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { app } from "@/firebase";
import { ApiInfo } from "PARENT_DIR/_shared/dto";

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

/**
 * Updates an existing API Info document in Firestore
 * @param apiInfoId - The ID of the API Info document to update
 * @param updatedApiInfo - Partial ApiInfo object with fields to update
 * @returns Promise<boolean> - True if update was successful
 */
export async function updateApiInfo(
    apiInfoId: string,
    updatedApiInfo: Partial<ApiInfo>
): Promise<boolean> {
    console.log("🔍 updateApiInfo called with apiInfoId:", apiInfoId, "data:", updatedApiInfo);
    
    try {
        // Validate app is initialized
        if (!app) {
            throw new Error("Firebase app is not initialized");
        }

        const db = getFirestore(app);
        const apiInfoCollection = collection(db, 'apiInfo');
        const apiInfoDoc = doc(apiInfoCollection, apiInfoId);

        // Remove undefined values - Firestore doesn't accept undefined
        const cleanData = Object.fromEntries(
            Object.entries(updatedApiInfo).filter(([_, value]) => value !== undefined)
        ) as Partial<ApiInfo>;

        // Prepare the update data with updatedAt timestamp
        const updateData = {
            ...cleanData,
            updatedAt: serverTimestamp(),
            // Don't update id field
            id: undefined,
        };

        // Remove id from updateData
        delete (updateData as any).id;

        console.log("🔍 Updating document in Firestore:", updateData);

        await updateDoc(apiInfoDoc, updateData);

        console.log("✅ Document updated successfully");
        return true;
    } catch (error) {
        console.error("❌ Error in updateApiInfo:", error);
        console.error("❌ Error details:", {
            message: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
        });
        throw error;
    }
}