import {Segment} from "./segment";

export interface Eligibility {
  id: number;
  name: string;
  description: string;
  createDate: string;
  updateDate: string;
  startDate: string;
  endDate: string;
  expireDate: string;
  active: boolean;
  segments: Segment[];
}

