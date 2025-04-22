import { Message } from './message';
import { UserData } from './user';
export interface Chat {
    messages: Message[] | unknown[],
    users: unknown[] | UserData[],
    selectedUser: UserData | null,
    isUsersLoading: boolean,
    isMessagesLoading: boolean,

    getUsers: () => Promise<void>,
    getMessages: (userId: string) => Promise<void>
    setSelectedUser: (selectedUser: UserData | null) => void,
    sendMessage: (data : unknown) => Promise<void>
    suscribeToMessages: () => void;
    unsuscribeToMessages : () => void;
}