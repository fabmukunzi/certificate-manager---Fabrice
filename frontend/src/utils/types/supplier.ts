import { SupplierDto } from '.';

export interface ISupplier {
  id: number;
  name: string;
  city: string;
}

export interface SupplierColumn {
  header: string;
  accessor: keyof SupplierDto;
}

export type IAction =
  | { type: 'SET_FORM_VALUE'; name: string; value: string }
  | { type: 'SET_FILTERED_SUPPLIERS'; suppliers: SupplierDto[] }
  | { type: 'SET_SELECTED_SUPPLIER'; supplier: string | undefined }
  | { type: 'RESET_FORM' };

export interface State {
  formValues: {
    name: string;
    index: string;
    city: string;
  };
  filteredSuppliers: SupplierDto[];
  selectedSupplier: string | undefined;
}
