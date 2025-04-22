import { Socket } from 'socket.io-client';
import { UserData } from './user';

export interface AuthState {
    authUser: null | UserData;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isUpdatingProfile: boolean;
    isCheckingAuth: boolean;
    onlineUsers: string[];
    socket: Socket |  null;
    
    checkAuth: () => Promise<void>;
    signup: (data:unknown) => Promise<void>;
    logout: () => Promise<void>;
    login: (data: unknown) => Promise<void>;
    updateProfile: (data: unknown) => Promise<void>;
    updateCollections: (data: unknown) => Promise<void>;
    deleteCollections: (data: unknown) => Promise<void>;
    connectSocket: () => void;
    disconnectSocket: () => void;

}