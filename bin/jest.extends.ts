import { expect } from "@jest/globals";
import * as extenders from "./matches";

expect.extend({
  ...extenders.default,
});
