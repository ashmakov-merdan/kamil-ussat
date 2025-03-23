interface IClient {
  id: number;
  name: string;
  priority: number;
  is_active: boolean;
  slug: string;
  files: {
    path: string;
    blurhash: string;
  }[];
}