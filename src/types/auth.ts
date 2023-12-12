export interface StoreState {
    auth: {
        user: string | null; // Replace YourUserType with the actual type of your user object
        roles: string[]; // Assuming roles are represented as an array of strings
        token: string | null; // Assuming token is a string or null
    };
}
