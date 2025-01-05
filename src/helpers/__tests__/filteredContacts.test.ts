import { OrganizationContactType } from "src/types";
import { filteredContacts } from "../filteredContacts";

const organizationContactsMock: OrganizationContactType[] = [
  {
    id: 1,
    name: "John Doe",
    title: "CEO",
    company: "ABC Corporation",
    organization: {
      id: 123,
      owner: 129,
      name: "John Doe",
      logo: "",
      created: "2017-12-12",
      updated: "2018-12-12",
    },
    email: "john.doe@example.com",
    phone: "123-456-7890",
    thumbnail: "https://example.com/thumbnails/john-doe.jpg",
    url: "https://example.com/john-doe",
    created: "2023-05-01T09:00:00Z",
    updated: "2023-05-15T15:30:00Z",
    note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  // Add more mock data as needed
];

const assetOrganizationContactTypeMock = {
  id: 1,
  asset: 456,
  organizationcontact: "John Doe",
  organizationcontact_details: {
    id: 1,
    name: "John Doe",
    title: "CEO",
    company: "ABC Corporation",
    organization: 123,
    email: "john.doe@example.com",
    phone: "123-456-7890",
    thumbnail: "https://example.com/thumbnails/john-doe.jpg",
    url: "https://example.com/john-doe",
    created: "2023-05-01T09:00:00Z",
    updated: "2023-05-15T15:30:00Z",
    note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  created: "2023-05-10T14:00:00Z",
  updated: "2023-05-15T16:45:00Z",
};

describe("filteredContacts", () => {
  it("should return an empty array if contacts is empty", () => {
    const contacts: any[] = [];
    const assetContacts = [assetOrganizationContactTypeMock];

    const result = filteredContacts({ contacts, assetContacts });

    expect(result).toEqual([]);
  });

  it("should filter out contacts with matching assetContacts", () => {
    const contacts = organizationContactsMock;
    const assetContacts = [assetOrganizationContactTypeMock];

    const result = filteredContacts({ contacts, assetContacts });

    expect(result).toEqual([]);
  });

  it("should keep contacts that do not match assetContacts", () => {
    const contacts = organizationContactsMock;
    const assetContacts = [
      {
        id: 2,
        asset: 789,
        organizationcontact: "Another Contact",
        organizationcontact_details: {
          id: 2,
          name: "Another Contact",
          title: "Manager",
          company: "XYZ Corp",
          organization: 456,
          email: "another.contact@example.com",
        },
        created: "2023-05-12T10:00:00Z",
        updated: "2023-05-18T13:30:00Z",
      },
    ];

    const result = filteredContacts({ contacts, assetContacts });

    expect(result).toEqual(organizationContactsMock);
  });
});
