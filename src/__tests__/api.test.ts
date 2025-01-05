import axios from "axios";
import {
  fetchAssetsMock,
  fetchContactsMock,
  organizationMock,
} from "../_mock/datas";
import {
  fetchAssets,
  fetchOrganizationContacts,
  fetchOrganizationSites,
} from "../api";
import { URL } from "../constants";

const token = "c2ve6whj5cvgws4djkhcv3djhvbj";
const expectedHeaders = {
  Authorization: "Bearer c2ve6whj5cvgws4djkhcv3djhvbj",
  "Content-Type": "application/json",
};
jest.mock("axios");

describe("Api tests", () => {
  describe("fetchAssets", () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it("should return when API call succeeds", async () => {
      const mAxiosGet = axios.get as jest.Mock;
      mAxiosGet.mockResolvedValue({ data: fetchAssetsMock });
      const result = await fetchAssets({
        token,
        url: `${URL.base}${URL.assets}`,
        limit: 25,
        type: undefined,
        category: undefined,
        search: undefined,
      });

      expect(result).toEqual(fetchAssetsMock);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(`${URL.base}${URL.assets}`, {
        headers: expectedHeaders,
        params: {
          limit: 25,
          assettype: undefined,
          assetcategory: undefined,
          search: undefined,
        },
      });
    });

    it("should handle errors when fetching assets", async () => {
      const expectedError = new Error("Failed to fetch assets");
      const mAxiosGet = jest.mocked(axios.get);
      mAxiosGet.mockRejectedValueOnce(expectedError);

      await expect(
        fetchAssets({ url: `${URL.base}${URL.assets}`, token })
      ).rejects.toThrow(expectedError);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(`${URL.base}${URL.assets}`, {
        headers: expectedHeaders,
        params: {
          limit: 25,
          assettype: undefined,
          assetcategory: undefined,
          search: undefined,
        },
      });
    });
  });

  describe("fetchOrganizationSites", () => {
    afterEach(() => {
      jest.resetAllMocks();
    });
    it("should return organization sites when API call succeeds", async () => {
      const mAxiosGet = axios.get as jest.Mock;
      mAxiosGet.mockResolvedValue({ data: organizationMock });
      const result = await fetchOrganizationSites(token);
      expect(result).toEqual(organizationMock);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `${URL.base}${URL.organizationSites}`,
        {
          headers: expectedHeaders,
        }
      );
    });
    it("should handle errors when fetching organization sites", async () => {
      const expectedError = new Error("Failed to fetch organization sites");
      const mAxiosGet = jest.mocked(axios.get);
      mAxiosGet.mockRejectedValueOnce(expectedError);

      await expect(fetchOrganizationSites(token)).rejects.toThrow(
        expectedError
      );
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `${URL.base}${URL.organizationSites}`,
        {
          headers: expectedHeaders,
        }
      );
    });
  });

  describe("fetchOrganizationContacts", () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it("should fetch organization contacts successfully", async () => {
      const mAxiosGet = axios.get as jest.Mock;

      mAxiosGet.mockResolvedValue({ data: fetchContactsMock });
      const result = await fetchOrganizationContacts({
        token,
        search: undefined,
        company: undefined,
        limit: undefined,
        title: undefined,
      });

      expect(result).toEqual(fetchContactsMock);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `${URL.base}${URL.organizationContacts}`,
        {
          headers: expectedHeaders,
          params: {
            company: undefined,
            limit: undefined,
            search: undefined,
            title: undefined,
          },
        }
      );
    });

    it("should handle errors when fetching organization contacts", async () => {
      const expectedError = new Error("Failed to fetch organization contacts");
      const mAxiosGet = jest.mocked(axios.get);
      mAxiosGet.mockRejectedValueOnce(expectedError);

      await expect(
        fetchOrganizationContacts({
          token,
          search: undefined,
          company: undefined,
          limit: undefined,
          title: undefined,
        })
      ).rejects.toThrow(expectedError);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `${URL.base}${URL.organizationContacts}`,
        {
          headers: expectedHeaders,
          params: {
            company: undefined,
            limit: undefined,
            search: undefined,
            title: undefined,
          },
        }
      );
    });
  });
});
