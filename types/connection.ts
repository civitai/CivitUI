/**
 * Connection object
 * @property source - Connection start point ID
 * @property sourceHandle - Connection start anchor point ID
 * @property target - Connection end point ID
 * @property targetHandle - Connection end anchor point ID
 */
export interface Connection {
  source: string;
  sourceHandle: string;
  target: string;
  targetHandle: string;
}
