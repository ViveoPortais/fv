export function sortByKey<T>(data: T[], key: keyof T): T[] {
    return [...data].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];
  
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue);
      }
  
      return 0;
    });
  }
  