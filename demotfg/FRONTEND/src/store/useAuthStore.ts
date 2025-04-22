/* eslint-disable @typescript-eslint/no-explicit-any */
import {create} from "zustand";
import { axiosInstance } from "@/lib/axios";
import { io } from "socket.io-client";
import { AuthState } from "@/interfaces/authState";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5001"



export const useAuthStore = create<AuthState>((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    socket: null,

    isCheckingAuth: false,

    checkAuth: async (): Promise<void> =>  {
        try {
            const res = await axiosInstance.get("/auth/check");

            set({authUser: res.data});

            get().connectSocket();
        } catch (error) {
            set({authUser: null});
            console.log(error);
        } finally{
            set({isCheckingAuth: false});
        }
    },

    signup: async (data) => {
        set({isSigningUp : false})
      try {
        const res = await axiosInstance.post("/auth/signup", data);
        set({authUser: res.data});
        toast.success("Account created succesfully");
        get().connectSocket();
      } catch (error : any) {
        toast.error(error);
      } finally {
        set({isSigningUp : false})
      }
    },
    logout: async () => {
        try {
            await axiosInstance.post("auth/logout");
            set({authUser: null});
            toast.success("Logged out succesfully");
            get().disconnectSocket();
        } catch (error) {
            toast.error(`Logout ${error}`);
        }
    },
    login: async (data) => {
        set({isLoggingIn: true})
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({authUser: res.data});
            toast.success("Logged in succesfully");

            get().connectSocket()

        } catch (error : any) {
            toast.error(`${error.response.data.message}`);
        } finally {
            set({isLoggingIn: false});
        }
    },
    updateProfile: async (data) => {
        set({isUpdatingProfile: true});
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            if (res.status == 413) {
                toast.error("Image too large, max size 1MB")
                return;
            }
            set({authUser: res.data});
            toast.success("Profile updated succesfully");
        } catch (error) {
            toast.error(`Error in update profile ${error}` )
        } finally {
            set({isUpdatingProfile: false});
        }
    },

    updateCollections: async (data : any) => {
        set({isUpdatingProfile: true});
        try {
            const res = await axiosInstance.put("/auth/update-collections", data);
            set({authUser: res.data});
            toast.success("Guardado correctamente");
        }catch ( error : any) {
            if (error.response.status == 400) {
            toast.error("Ya lo tienes guardado en tu colección")
            }
        }finally {
            set({isUpdatingProfile: false});
        }
    },

    deleteCollections: async (data : any) => {
        set({isUpdatingProfile: true});
        try {
            const res = await axiosInstance.put("/auth/delete-collections", data);
            set({authUser: res.data});
            toast.success("Eliminado correctamente");
        }catch ( error : any) {
            if (error.response.status == 400) {
            toast.error("Ya lo tienes guardado en tu colección")
            }
        }finally {
            set({isUpdatingProfile: false});
        }
    },


    connectSocket: () => {
        const {authUser} = get()

        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            }
        });
        socket.connect();
        set({socket: socket});

        socket.on("getOnlineUsers", (userIds) => {
            set({onlineUsers: userIds})
        });
    },

    disconnectSocket: () => {
        if (get().socket?.connected) get().socket?.disconnect();
    }

}));