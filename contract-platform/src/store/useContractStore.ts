import { create } from 'zustand';
import { Blueprint, Contract, ContractStatus } from '@/types';

interface ContractState {
  blueprints: Blueprint[];
  contracts: Contract[];
  
  // Actions to change the state
  addBlueprint: (blueprint: Blueprint) => void;
  addContract: (contract: Contract) => void;
  updateContractStatus: (id: string, status: ContractStatus) => void;
  updateContractValues: (id: string, values: Record<string, string | boolean>) => void;
}

export const useContractStore = create<ContractState>((set) => ({
  blueprints: [], // Starts empty
  contracts: [],  // Starts empty

  // Action: Save a new Blueprint template
  addBlueprint: (blueprint) => 
    set((state) => ({ blueprints: [...state.blueprints, blueprint] })),

  // Action: Create a new Contract instance
  addContract: (contract) => 
    set((state) => ({ contracts: [...state.contracts, contract] })),

  // Action: Move contract to next stage (e.g., Created -> Signed)
  updateContractStatus: (id, status) =>
    set((state) => ({
      contracts: state.contracts.map((c) =>
        c.id === id ? { ...c, status } : c
      ),
    })),

  // Action: Save user input when they fill out a contract
  updateContractValues: (id, values) =>
    set((state) => ({
      contracts: state.contracts.map((c) =>
        c.id === id ? { ...c, fieldValues: { ...c.fieldValues, ...values } } : c
      ),
    })),
}));