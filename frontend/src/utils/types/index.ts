/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2024-09-30 16:26:19.

export interface CertificateDto {
    id: number;
    validFrom: Date;
    validTo: Date;
    certificateType: CertificateType;
    pdfUrl: string;
    supplier: SupplierEntity;
    certificateAssignedUsers: UserDto[];
    comments: CommentDto[];
}

export interface CommentDto {
    id: number;
    user: UserDto;
    content: string;
}

export interface DepartmentDto {
    id: number;
    title: string;
}

export interface SupplierDto {
    id: number;
    name: string;
    city: string;
    index: string;
}

export interface UserDto {
    id: number;
    firstName: string;
    lastName: string;
    plant: string;
    department: string;
    email: string;
    userId: string;
}

export interface SupplierEntity extends BaseEntity {
    name: string;
    city: string;
    index: string;
}

export interface BaseEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

export const enum CertificateType {
    PERMISSION_OF_PRINTING = "PERMISSION_OF_PRINTING",
    OHSAS_18001 = "OHSAS_18001",
}
