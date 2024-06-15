import { useState, useEffect } from 'react';
import useDebounce from 'app/hooks/use-debounce';

export type SearchResponseItem = {
  id: number;
  name: string;
  username: string;
  verified: boolean;
  img_url: string;
  address: string;
};

type SearchResponse = {
  results: Array<SearchResponseItem>;
};

// Mock data for demonstration
const MOCK_DATA: SearchResponseItem[] = [
  { id: 1, name: 'John Doe', username: 'johndoe', verified: true, img_url: 'url_to_image', address: '123 Main St' },
  // Add more mock items as needed
];

export const useSearch = (term: string) => {
  const [data, setData] = useState<SearchResponseItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const debouncedSearch = useDebounce(term, 200);

  useEffect(() => {
    const search = async () => {
      setLoading(true);
      setError(null);

      try {
        // Here you can implement your search logic on the MOCK_DATA
        // For simplicity, this example filters by name, but you can adjust the logic as needed
        const results = MOCK_DATA.filter(item =>
          item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        );

        setData(results);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setLoading(false);
      }
    };

    if (debouncedSearch && debouncedSearch.length >= 2) {
      search();
    } else {
      setData([]); // Clear data if search term is too short
    }
  }, [debouncedSearch]);

  return {
    data: MOCK_DATA,
    loading: !data,
    error,
  };
};
