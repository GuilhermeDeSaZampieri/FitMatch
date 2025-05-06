import { AuthUser, User } from "../../models/User";


interface AuthState {
    token: string;
    isAuthenticated: boolean | null;
    login: (email: string, password: string) => void;
    logout: () => void;
    refreshToken: (token: string) => void;
    isLoading: boolean;
    user: AuthUser;
}



export interface AppState {
    auth: AuthState;

}


export const initialState: AppState = {
    auth: {
        token: '',
        isAuthenticated: null,
        login: (email: string, password: string) => {
        },
        logout: () => {
        },
        refreshToken: (token: string) => {
        },
        isLoading: false,
        user: {
            email: '',
            password: ''
        }
    }
}
