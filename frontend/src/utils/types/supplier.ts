export interface ISupplier {
  id: number;
  name: string;
  city: string;
}

export interface SupplierColumn {
  header: string;
  accessor: keyof ISupplier;
}

export type IAction =
  | { type: 'SET_FORM_VALUE'; name: string; value: string }
  | { type: 'SET_FILTERED_SUPPLIERS'; suppliers: ISupplier[] }
  | { type: 'SET_SELECTED_SUPPLIER'; supplier: string | undefined }
  | { type: 'RESET_FORM' };

export interface State {
  formValues: {
    name: string;
    id: string;
    city: string;
  };
  filteredSuppliers: ISupplier[];
  selectedSupplier: string | undefined;
}
