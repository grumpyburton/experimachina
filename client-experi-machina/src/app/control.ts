import {Eligibility} from "./eligibility";

export interface Control {
  id: number;
  name: string;
  active: boolean;
  description: string;
  createDate: string;
  updateDate: string;
  startDate: string;
  endDate: string;
  expireDate: string;
  eligibilities : Eligibility[];
}

