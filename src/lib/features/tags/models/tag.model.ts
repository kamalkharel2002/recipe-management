export interface Tag {
  id: number;
  name: string;
  color: string;
}

export type TagDraft = Omit<Tag, 'id'>;
