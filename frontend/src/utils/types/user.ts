import { UserDto } from '.';

export interface UserTable {
  name: string;
  email: string;
  department: string;
}
export interface UserColumn {
  header: string;
  accessor: keyof UserDto;
}
