// Define the allowed field types as per Requirement 1 [cite: 17]
export type FieldType = 'text' | 'date' | 'signature' | 'checkbox';

// Define the lifecycle stages as per Requirement 3 [cite: 28]
export type ContractStatus = 'Created' | 'Approved' | 'Sent' | 'Signed' | 'Locked' | 'Revoked';

// Structure for a single field in a Blueprint [cite: 18, 19, 20]
export interface BlueprintField {
  id: string;
  type: FieldType;
  label: string;
  position: number; // To handle "Ability to place fields"
}

// Structure for a Blueprint (Template)
export interface Blueprint {
  id: string;
  name: string;
  fields: BlueprintField[];
}

// Structure for a Contract (Instance)
export interface Contract {
  id: string;
  name: string;           // [cite: 39]
  blueprintId: string;
  blueprintName: string;  // [cite: 40]
  status: ContractStatus; // [cite: 41]
  createdDate: string;    // [cite: 42]
  // Stores the actual user input (e.g., { "field-1": "John Doe" }) [cite: 25]
  fieldValues: Record<string, string | boolean>; 
}