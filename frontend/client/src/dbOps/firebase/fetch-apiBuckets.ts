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

export async function fetchApiBuckets() {
    try {
        console.log("🔍 fetchApiBuckets called");
        
        // Validate app is initialized
        if (!app) {
            throw new Error("Firebase app is not initialized");
        }
        
        // direct firebase operation for fetching documents from apiInfos collection
        const db = getFirestore(app);  
        const apiBucketCollection = collection(db, 'apiBuckets');

        // Add timeout to prevent hanging
        // const apiBuckets = await withTimeout(getDocs(apiBucketCollection), 10000);
        
        const apiBuckets = await getDocs(apiBucketCollection);

        console.log("🔍 apiBuckets: ", apiBuckets);
        const apiBucketsData = apiBuckets.docs.map((doc) => {
            const data = doc.data();
            console.log("🔍 Doc ID:", doc.id, "Data:", data);
            return { id: doc.id, ...data };
        });
        
        return apiBucketsData;
    } catch (error) {
        console.error("❌ Error in fetchApiBuckets:", error);
        console.error("❌ Error details:", {
            message: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
        });
        throw error;
    }
}