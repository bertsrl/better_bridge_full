import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "@/firebase";

// Helper function to add timeout to promises
function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
    return Promise.race([
        promise,
        new Promise<T>((_, reject) =>
            setTimeout(() => reject(new Error(`Operation timed out after ${timeoutMs}ms`)), timeoutMs)
        ),
    ]);
}

export async function fetchApiInfos() {
    try {
        console.log("🔍 fetchApiInfos called");
        console.log("🔍 Firebase app:", app);
        
        // Validate app is initialized
        if (!app) {
            throw new Error("Firebase app is not initialized");
        }
        
        // direct firebase operation for fetching documents from apiInfos collection
        const db = getFirestore(app);
        console.log("🔍 Firestore db initialized:", db);
        
        const apiInfoCollection = collection(db, 'apiInfo');
        console.log("🔍 Collection reference:", apiInfoCollection);
        
        console.log("🔍 Starting getDocs query with 10s timeout...");
        
        // Add timeout to prevent hanging
        const apiInfos = await withTimeout(getDocs(apiInfoCollection), 10000);
        
        console.log("🔍 Query completed. Docs count:", apiInfos.docs.length);
        console.log("🔍 Raw docs:", apiInfos.docs);
        
        const apiInfosData = apiInfos.docs.map((doc) => {
            const data = doc.data();
            console.log("🔍 Doc ID:", doc.id, "Data:", data);
            return { id: doc.id, ...data };
        });
        
        console.log("🔍 Final apiInfosData:", apiInfosData);
        return apiInfosData;
    } catch (error) {
        console.error("❌ Error in fetchApiInfos:", error);
        console.error("❌ Error details:", {
            message: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
        });
        throw error;
    }
}