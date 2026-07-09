import {defineConfig} from "sanity";
import {structureTool} from "sanity/structure";
import {schemaTypes} from "./schemas";

export default defineConfig({
  name: "default",
  title: "Heritage Restoration Studio",
  projectId: "pm288vva",
  dataset: "production",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});