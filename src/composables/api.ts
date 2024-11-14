import { mande, type MandeInstance } from 'mande';

export function api(url: string): MandeInstance {
  return mande(`${import.meta.env.VITE_API}/${url}`,
    {
      headers: {
        Accept: null,
        'Content-Type': null,
      },
    }
  );
}
