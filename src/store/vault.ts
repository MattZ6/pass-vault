import { create } from "zustand";

export type CredentialMeta = {
  id: string;
  service: string;
  username: string;
};

type AdCredentialInput = Pick<CredentialMeta, "service" | "username">;

type VaultState = {
  credentials: CredentialMeta[];
  addCredential: (input: AdCredentialInput) => void;
  getCredentialById: (id: string) => CredentialMeta | null;
};

const MOCK: CredentialMeta[] = [
  {
    id: "0",
    service: "Instagram",
    username: "john.mcenroe@me.com",
  },
  {
    id: "1",
    service: "YouTube",
    username: "mcenroe@gmail.com",
  },
  {
    id: "2",
    service: "GitHub",
    username: "mcenroe@gmail.com",
  },
  {
    id: "3",
    service: "Gmail",
    username: "mcenroe@gmail.com",
  },
  {
    id: "4",
    service: "Facebook",
    username: "john_mcenroe@hotmail.com",
  },
  {
    id: "5",
    service: "Dribbble",
    username: "mcenroe@gmail.com",
  },
  {
    id: "6",
    service: "Apple",
    username: "john.mcenroe@me.com",
  },
  {
    id: "7",
    service: "Steam",
    username: "john_mcenroe@hotmail.com",
  },
  {
    id: "8",
    service: "Spotify",
    username: "john.mcenroe@me.com",
  },
  {
    id: "9",
    service: "ServiceNow",
    username: "mcenroe@gmail.com",
  },
];

export const useVaultStore = create<VaultState>((set, get) => ({
  credentials: MOCK,

  addCredential: (input) => {
    const newCredential: CredentialMeta = {
      id: Date.now().toString(),
      service: input.service,
      username: input.username,
    };

    set((s) => ({ credentials: [...s.credentials, newCredential] }));
  },

  getCredentialById: (id) => {
    const credential = get().credentials.find((c) => c.id === id);

    return credential ?? null;
  },
}));
