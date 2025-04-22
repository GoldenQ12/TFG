import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from './useAuthStore';




export const useChatStore = create<Chat>((set,get) => ({
    messages: [],
    users:[],
    selectedUser : null,
    isUsersLoading: false,
    isMessagesLoading: false,
    getUsers : async () =>  {
        set({isUsersLoading: true});
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data});
        } catch (error) {
            toast.error(`Error in getting users ${error}`)
        } finally{
            set({isUsersLoading: false});
        }
    },

    getMessages: async(userId: string) => {
        set({isMessagesLoading: true});
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            console.log(res)
            set({ messages: res.data });
        } catch (error) {
            toast.error(`Error in getting messages ${error}`)
        } finally{
            set({isMessagesLoading: false})
        }
    },

    setSelectedUser(selectedUser) {
        set({selectedUser})
    },

    suscribeToMessages: () => {
        const {selectedUser} = get()
        if (!selectedUser) return;
        
        const socket = useAuthStore.getState().socket;

        socket?.on("newMessage", (newMessage) => {
            if (newMessage.senderId !== selectedUser._id) return;
            set({messages: [...get().messages, newMessage]});
        });

    },

    unsuscribeToMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket?.off("newMessage");
    },


    sendMessage: async (messageData) =>  {
        const {selectedUser, messages} = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser?._id}`, messageData);
            set({messages: [...messages, res.data]})
        } catch (error) {
            toast.error(error);
        }
    },

}));