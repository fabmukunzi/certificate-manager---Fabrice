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
export type ICertificate = {
  id?: number;
  supplier: string;
  certificateType: string;
  validFrom: string;
  validTo: string;
  pdfUrl: string | null;
};
