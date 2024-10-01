import { SupplierDto } from '@/endpoints';

export interface SupplierColumn {
  header: string;
  accessor: keyof SupplierDto;
}

export type IAction =
  | { type: 'SET_FORM_VALUE'; name: string; value: string }
  | { type: 'SET_FILTERED_SUPPLIERS'; suppliers: SupplierDto[] }
  | {
      type: 'SET_SELECTED_SUPPLIER';
      supplier: SupplierDto;
    }
  | { type: 'RESET_FORM' };

export interface State {
  formValues: {
    name: string;
    index: string;
    city: string;
  };
  filteredSuppliers: SupplierDto[];
  selectedSupplier: SupplierDto;
}
