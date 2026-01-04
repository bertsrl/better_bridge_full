import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { app } from "@/firebase";
import { ApiInfo } from "PARENT_DIR/_shared/dto";

/**
 * Creates a new API Info document in Firestore
 * @param newApiInfo - Partial ApiInfo object to create
 * @returns Promise<string> - The ID of the newly created document
 */
export async function createApiInfo(newApiInfo: Partial<ApiInfo>): Promise<string> {
    console.log("🔍 createApiInfo called with:", newApiInfo);
    
    try {
        // Validate app is initialized
        if (!app) {
            throw new Error("Firebase app is not initialized");
        }

        const db = getFirestore(app);
        const apiInfoCollection = collection(db, 'apiInfo');

        // Remove undefined values - Firestore doesn't accept undefined
        const cleanData = Object.fromEntries(
            Object.entries(newApiInfo).filter(([_, value]) => value !== undefined)
        ) as Partial<ApiInfo>;

        // Prepare the document data with timestamps
        const apiInfoData = {
            ...cleanData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            // Ensure required fields have defaults if not provided
            enabled: cleanData.enabled ?? false,
            lastRun: cleanData.lastRun ?? null,
        };

        console.log("🔍 Adding document to Firestore:", apiInfoData);

        // Add the document to Firestore
        const docRef = await addDoc(apiInfoCollection, apiInfoData);

        console.log("✅ Document created successfully with ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("❌ Error in createApiInfo:", error);
        console.error("❌ Error details:", {
            message: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
        });
        throw error;
    }
}

