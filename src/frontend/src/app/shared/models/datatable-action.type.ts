import { Constraint } from '~/app/shared/models/constraint.type';
import { Datatable } from '~/app/shared/models/datatable.interface';
import { DatatableData } from '~/app/shared/models/datatable-data.type';

export type DatatableAction = {
  type?: 'button' | 'file' | 'divider';
  text?: string;
  icon?: string;
  tooltip?: string;
  callback?: (event: Event, action: DatatableAction, table: Datatable) => void;
  // The constraints that must be fulfilled to enable this action.
  enabledConstraints?: {
    minSelected?: number;
    maxSelected?: number;
    // If the specified constraint succeeds for all selected rows,
    // then the action will be enabled.
    constraint?: Constraint[];
    callback?: (selected: DatatableData[], table?: Datatable) => boolean;
  };
};
