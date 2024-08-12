export type ICertificateFormData = {
  supplier: FormDataEntryValue | null;
  certificateType: FormDataEntryValue | null;
  validFrom: FormDataEntryValue | null;
  validTo: FormDataEntryValue | null;
  pdfUrl: string | null;
};
export type ISupplierData = {
  supplier: string;
  certificateType: string;
  validFrom: string;
  validTo: string;
  pdfUrl: string | null;
};
export interface ISupplier {
  id: number;
  name: string;
  city: string;
}
export type ICertificate = {
  id?: number;
  supplier: string;
  certificateType: string;
  validFrom: string;
  validTo: string;
  pdfUrl: string | null;
  assignedUsers?: IUser[];
};
export interface Column {
  header: string;
  accessor: keyof ICertificate;
}
export interface IUser {
  name: string;
  firstname: string;
  id: number;
  email: string;
  department: string;
  plant: string;
}
