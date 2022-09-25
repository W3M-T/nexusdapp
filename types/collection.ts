export interface INftCollection {
  collection: string;
  type: string;
  name: string;
  ticker: string;
  owner: string;
  timestamp: number;
  canFreeze: boolean;
  canWipe: boolean;
  canPause: boolean;
  canTransferNftCreateRole: boolean;
  roles: any[];
}
