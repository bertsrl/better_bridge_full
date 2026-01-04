import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import { app } from "@/firebase";
import { ApiInfo } from "PARENT_DIR/_shared/dto";

/**
 * Fetches a single API Info document by ID from Firestore
 * @param apiInfoId - The ID of the API Info document to fetch
 * @returns Promise<ApiInfo | null> - The API Info document or null if not found
 */
export async function fetchApiInfoById(apiInfoId: string): Promise<ApiInfo | null> {
    console.log("🔍 fetchApiInfoById called with apiInfoId:", apiInfoId);
    
    try {
        // Validate app is initialized
        if (!app) {
            throw new Error("Firebase app is not initialized");
        }

        const db = getFirestore(app);
        const apiInfoCollection = collection(db, 'apiInfo');
        const apiInfoDoc = doc(apiInfoCollection, apiInfoId);

        const docSnapshot = await getDoc(apiInfoDoc);

        if (!docSnapshot.exists()) {
            console.log("⚠️ Document not found with ID:", apiInfoId);
            return null;
        }

        const data = docSnapshot.data();
        console.log("✅ Document fetched successfully:", data);

        return {
            id: docSnapshot.id,
            ...data,
        } as ApiInfo;
    } catch (error) {
        console.error("❌ Error in fetchApiInfoById:", error);
        console.error("❌ Error details:", {
            message: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
        });
        throw error;
    }
}

