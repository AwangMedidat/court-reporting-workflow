export interface Job {
  id: string;
  caseName: string;
  duration: number;
  location: string;
  city: string;
  status: string;
  reporterId: string | null;
  editorId: string | null;
  createdAt: string;
  reporter?: Reporter | null;
  editor?: Editor | null;
}

export interface Reporter {
  id: string;
  name: string;
  location: string;
  availability: boolean;
  ratePerMinute: number;
}

export interface Editor {
  id: string;
  name: string;
  availability: boolean;
  flatFee: number;
}

export interface PayloadCreateJobs {
  caseName: string;
  duration: number;
  location: string;
  city: string;
}
