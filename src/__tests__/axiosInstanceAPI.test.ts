import { fetchContactByIdMock } from "../_mock/datas";
import { fetchOrganizationContactById } from "../api";
import { URL } from "../constants";
import axiosInstance from "../utils/axiosInstance";

jest.mock("../utils/axiosInstance");

describe("AxioInstance api request", () => {
  describe("fetchOrganizationContactById", () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it("should fetch one organization contact successfully", async () => {
      const mAxiosGet = axiosInstance.get as jest.Mock;

      mAxiosGet.mockResolvedValue({ data: fetchContactByIdMock });
      const result = await fetchOrganizationContactById(4);

      expect(result).toEqual(fetchContactByIdMock);
      expect(axiosInstance.get).toHaveBeenCalledTimes(1);
      expect(axiosInstance.get).toHaveBeenCalledWith(
        `${URL.base}${URL.organizationContacts}/${4}`
      );
    });

    it("should handle errors when fetching organization contacts", async () => {
      const expectedError = new Error("Failed to fetch organization contacts");
      const mAxiosGet = jest.mocked(axiosInstance.get);
      mAxiosGet.mockRejectedValueOnce(expectedError);

      await expect(fetchOrganizationContactById(4)).rejects.toThrow(
        expectedError
      );
      expect(axiosInstance.get).toHaveBeenCalledTimes(1);
      expect(axiosInstance.get).toHaveBeenCalledWith(
        `${URL.base}${URL.organizationContacts}/${4}`
      );
    });
  });
});
