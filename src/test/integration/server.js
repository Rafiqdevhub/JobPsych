import { setupServer } from "msw/node";
import { integrationHandlers } from "./handlers.js";

export const integrationServer = setupServer(...integrationHandlers);
