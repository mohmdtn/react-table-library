import { TableNode } from '@table-library/react-table-library/types/table';

export const findNodeById = <T extends TableNode>(nodes: T[], id: string): T | null =>
  nodes.reduce((acc: T | null, value: T): T | null => {
    if (acc) return acc;

    if (value.id === id) {
      return value;
    }

    if (value.nodes) {
      return findNodeById(value.nodes, id) as T;
    }

    return acc;
  }, null);
