import { create } from "zustand";

interface CreatorsStore {
    competitor: any[];
    loading: boolean;
    error: string | null;
    addCompiterer: (data: any) => void;
    removeCompiterer: (data: any) => void;
}

export const useCreatorsStore = create<CreatorsStore>((set) => ({
    competitor: [],
    loading: false,
    error: null,

    addCompiterer: (data) => {
        set((state) => ({ competitor: [...state.competitor, data] }));
    },
    removeCompiterer: (data) => {
        set((state) => {
            const filteredCompetitors = state.competitor.filter(
                (competitor) => competitor.owner !== data.owner
            );
            console.log(filteredCompetitors)
            return { competitor: filteredCompetitors };
        });
    }
}
));
