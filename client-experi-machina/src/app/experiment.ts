import {Eligibility} from "./eligibility";

export interface Experiment {
  id: number;
  name: string;
  description: string;
  problem: string;
  objective: string;
  hypothesis: string;
  outcome: string;
  active: boolean;
  createDate: string;
  updateDate: string;
  startDate: string;
  endDate: string;
  expireDate: string;
  eligibilities : Eligibility[];
}

