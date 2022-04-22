import { renderHook } from "@testing-library/react-hooks";
import useFetchAPI from "./use-fetch-api";
import mockData from "../mockData.json";
import * as api from "../api";

const data = mockData.slice(0, 1);

beforeEach(() => {
  jest.spyOn(api, "default").mockResolvedValue(data);
});

afterEach(() => {
  jest.spyOn(api, "default").mockRestore();
});

test("hook make request when fetchData method call", async () => {
  const { result, waitForNextUpdate } = renderHook(() => useFetchAPI());

  expect(result.current.loading).toBe(false);
  expect(result.current.data).toEqual([]);

  result.current.fetchData();

  expect(result.current.loading).toBe(true);

  await waitForNextUpdate();

  expect(result.current.loading).toBe(false);
  expect(result.current.data).toEqual(data);
});

test("hook make request for additional data when loadMoreData method call", async () => {
  const { result, waitForNextUpdate } = renderHook(() => useFetchAPI());

  expect(result.current.loading).toBe(false);
  expect(result.current.data).toEqual([]);

  result.current.fetchData();

  expect(result.current.loading).toBe(true);

  await waitForNextUpdate();

  expect(result.current.loading).toBe(false);

  result.current.loadMoreData();

  expect(result.current.loading).toBe(true);

  await waitForNextUpdate();

  expect(result.current.loading).toBe(false);
  expect(result.current.data).toEqual([...data, ...data]);
});
