// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
    login: string;       // The username of the candidate
    id: number;          // The unique ID of the candidate
    avatar_url: string;  // URL to the candidate's avatar image
    html_url: string;    // URL to the candidate's GitHub profile
    name?: string;       // The candidate's full name (optional, may not be available)
    company?: string;    // The company where the candidate works (optional)
    location?: string;   // The location of the candidate (optional)
    email?: string;      // The email of the candidate (optional)
  }
  