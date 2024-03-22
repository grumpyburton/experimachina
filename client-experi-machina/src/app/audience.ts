import {Customer} from "./customer";

export interface Audience {
  id: number;
  name: string | null;
  active: boolean;
  description: string | null;
  createDate: string;
  updateDate: string;
  startDate: string;
  endDate: string;
  expireDate: string;
  customers: Customer[];
}

