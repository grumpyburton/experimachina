import {Customer} from "./customer";
import {Control} from "./control";
import {Experiment} from "./experiment";
import {Feature} from "./feature";
import {Survey} from "./survey";

export interface Audience {
  id: number;
  name: string | null;
  active: boolean;
  description: string | null;
  createDate: string;
  updateDate: string;
  startDate: string | null;
  endDate: string | null;
  expireDate: string;
  customers: Customer[];
  type: string | null;
  controlGroup: Object | null;
  experiment: Object | null;
  feature: Object | null;
  survey: Object | null;
}

