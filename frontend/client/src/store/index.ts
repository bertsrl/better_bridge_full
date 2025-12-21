import { atom } from 'jotai';
import { ApiInfo } from 'PARENT_DIR/_shared/dto';

// NOTE: I'll keep this as an array structure for future use
export const newApiInfoAtoms = atom<ApiInfo[]>([]);

export const setNewApiInfoAtom = atom(null, (get, set, apiInfo: ApiInfo) => {
    set(newApiInfoAtoms, [...get(newApiInfoAtoms), apiInfo]);
});

export const getNewApiInfoAtoms = atom((get) => get(newApiInfoAtoms));

export const deleteNewApiInfoAtoms = atom(null, (get, set, apiInfoId: string) => {
    set(newApiInfoAtoms, get(newApiInfoAtoms).filter((apiInfo) => apiInfo.id !== apiInfoId));
});