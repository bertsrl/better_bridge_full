import addLead from "@/features/Discoverer/callKommo/kommo-leads/add-lead";
import { requestSchema } from "PARENT_DIR/_shared/schemas/request-records/kommoRequests/requestSchema";
import { z } from "zod";

interface IKommoRequest {
  loadInto(requestor: KommoRequestor): void;
}

export class GetRequest implements IKommoRequest {
  constructor(private payload: z.infer<typeof requestSchema>) {}

  loadInto(requestor: KommoRequestor): void {
    requestor["payload"] = this.payload;
  }
}

export class KommoRequestor {
  private payload: z.infer<typeof requestSchema>;

  loadDataIntoRequestor(request: IKommoRequest) {
    request.loadInto(this);  // Only IKommoRequest is allowed
  }

  async execute() {
    console.log("Calling:", this.payload.endpoint, "\n with:", this.payload.method, "\n and payload:", this.payload.payload);
    const response = await addLead(this.payload);
    console.log("Response:", response);
    return response;
  }
    
  // fn that gets all available customfields
  // fn that gets all available pipelines
  // fn that gets all available users
  // fn that gets all available tags

  // fn that selects the pipeline first and then 
  // does the operations of payloads array item gen.
  // its important to settle what kind of action are we making
  // (e.g. creating a card, updating a card, deleting a card, contact idem etc.)
   
  // for each mapBridge that we get, its important to also
  // receive instructions (what pipeline are we altering, what card (new, existing etc.))
}

// const req = new KommoRequestor();

// const getUser = new GetUserRequest(42);
// req.loadDataIntoRequestor(getUser);

// req.execute();

