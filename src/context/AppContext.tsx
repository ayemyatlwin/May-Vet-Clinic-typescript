import React, { createContext, useContext, useState } from "react";

type AppContextType = {
    selectedRow: number;
    setSelectedRow: React.Dispatch<React.SetStateAction<number>>;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    editModal: boolean;
    setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: React.ReactNode }) {
    const [selectedRow, setSelectedRow] = useState<number>(20);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);

    const contextValue: AppContextType = {
        selectedRow,
        setSelectedRow,
        searchQuery,
        setSearchQuery,
        showModal,
        setShowModal,
        editModal,
        setEditModal,
    };

    return (
        <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    );
}

export function useAppContext(): AppContextType {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    return context;
}
