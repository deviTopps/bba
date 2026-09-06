import type { SchemaTypeDefinition } from "sanity";
import { insightPost } from "./insightPost";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [insightPost],
};
