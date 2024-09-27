/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2024-09-28 23:49:24.

export interface UserDto {
    id: number;
    firstName: string;
    lastName: string;
    plant: string;
    department: string;
    email: string;
    userId: string;
}

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

export interface SupplierDto {
    id: number;
    name: string;
    city: string;
    index: string;
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

export type CertificateType = "PERMISSION_OF_PRINTING" | "OHSAS_18001";
