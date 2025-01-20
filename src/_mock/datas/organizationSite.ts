import { fakerFR_CA } from "@faker-js/faker";

export const mockOrganizationSiteData: OrganizationType[] = [
  {
    name: String(fakerFR_CA.location.streetAddress()),
    logo: fakerFR_CA.image.url(),
    id: Number(fakerFR_CA.number.int().toString().slice(0, 2)),
    address: fakerFR_CA.location.streetAddress(),
    created: fakerFR_CA.date.recent().toISOString(),
    updated: fakerFR_CA.date.recent().toISOString(),
  },
  {
    name: String(fakerFR_CA.location.streetAddress()),
    logo: fakerFR_CA.image.url(),
    id: Number(fakerFR_CA.number.int().toString().slice(0, 2)),
    address: fakerFR_CA.location.streetAddress(),
    created: fakerFR_CA.date.recent().toISOString(),
    updated: fakerFR_CA.date.recent().toISOString(),
  },
  {
    name: String(fakerFR_CA.location.streetAddress()),
    logo: fakerFR_CA.image.url(),
    id: Number(fakerFR_CA.number.int().toString().slice(0, 2)),
    address: fakerFR_CA.location.streetAddress(),
    created: fakerFR_CA.date.recent().toISOString(),
    updated: fakerFR_CA.date.recent().toISOString(),
  },
];

export type OrganizationType = {
  id: number;
  name: string;
  logo: string;
  address: string;
  created: string;
  updated: string;
};
