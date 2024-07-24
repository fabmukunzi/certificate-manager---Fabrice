export type ICertificate = {
  supplier: FormDataEntryValue | null;
  certificateType: FormDataEntryValue | null;
  validFrom: FormDataEntryValue | null;
  validTo: FormDataEntryValue | null;
  pdfUrl: string | null;
};
export type ICertificateColumns = {
  id: number;
  supplier: FormDataEntryValue | null;
  certificateType: FormDataEntryValue | null;
  validFrom: FormDataEntryValue | null;
  validTo: FormDataEntryValue | null;
};
