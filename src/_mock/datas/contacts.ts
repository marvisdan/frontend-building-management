import {
  OrganizationContactListResponseType,
  OrganizationContactType,
} from "../../types";

export const fetchContactsMock: OrganizationContactListResponseType = {
  count: 2,
  previous: null,
  next: null,
  results: [
    {
      url: "http://localhost:8000/organizationcontacts/4/",
      id: 4,
      organization: {
        id: 3,
        owner: 129,
        name: "John Doe",
        logo: "",
        created: "2017-12-12",
        updated: "2018-12-12",
      },
      thumbnail:
        "https://maxen-connect-storage-dev-local.s3.amazonaws.com/customers/contact-pictures/d437062e-657d-4ef7-94eb-68cd15a98ae8.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2NKKH45EU25GYVG6%2F20230425%2Fca-central-1%2Fs3%2Faws4_request&X-Amz-Date=20230425T211856Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=72b680c909d648c7433182b45618fc34dc7e661dd40e43f4a34e87a26902efe4",
      name: "Serge Bouchard",
      company: "Navada",
      title: "Technician",
      phone: "CA(506) 234-5678",
      email: "sbouchard@navada.com",
      note: "This person doesn't exist!",
      created: "2021-06-28T21:00:25.580328Z",
      updated: "2021-12-15T03:47:34.998671Z",
    },
    {
      url: "http://localhost:8000/organizationcontacts/9/",
      id: 9,
      organization: {
        id: 3,
        owner: 129,
        name: "John Doe",
        logo: "",
        created: "2017-12-12",
        updated: "2018-12-12",
      },
      thumbnail:
        "https://maxen-connect-storage-dev-local.s3.amazonaws.com/customers/contact-pictures/dfe0d296-6014-4421-a662-a45b7cc1933a.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2NKKH45EU25GYVG6%2F20230425%2Fca-central-1%2Fs3%2Faws4_request&X-Amz-Date=20230425T211856Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=b3d403cbbec93ec117d879d3aeb17c54a55f189c975a41aec7811972e37ca2ae",
      name: "René Lapierre",
      company: "Sodem",
      title: "Technician",
      phone: "CA(506) 234-5678",
      email: "rlapierre@sodem.net",
      note: "This person doesn't exist!",
      created: "2021-07-08T18:24:06.506676Z",
      updated: "2021-12-15T03:47:44.274900Z",
    },
  ],
};

export const fetchContactByIdMock: OrganizationContactType = {
  url: "http://localhost:8000/organizationcontacts/4/",
  id: 4,
  organization: {
    id: 3,
    owner: 129,
    name: "John Doe",
    logo: "",
    created: "2017-12-12",
    updated: "2018-12-12",
  },
  thumbnail:
    "https://maxen-connect-storage-dev-local.s3.amazonaws.com/customers/contact-pictures/d437062e-657d-4ef7-94eb-68cd15a98ae8.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2NKKH45EU25GYVG6%2F20230425%2Fca-central-1%2Fs3%2Faws4_request&X-Amz-Date=20230425T211856Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=72b680c909d648c7433182b45618fc34dc7e661dd40e43f4a34e87a26902efe4",
  name: "Serge Bouchard",
  company: "Navada",
  title: "Technician",
  phone: "CA(506) 234-5678",
  email: "sbouchard@navada.com",
  note: "This person doesn't exist!",
  created: "2021-06-28T21:00:25.580328Z",
  updated: "2021-12-15T03:47:34.998671Z",
};

export const contactDiscipline = [
  "Architecture",
  "Building Controls",
  "Construction",
  "Electrical",
  "HVAC",
  "Plumbing",
  "Fire Protection",
  "Ports & Waterways",
  "Structural",
];

export const contactTitle = [
  "president",
  "vice_president",
  "building_manager",
  "property_manager",
  "portfolio_manager",
  "esg_manager",
  "maintenance_director",
  "maintenance_manager",
  "facility_manager",
  "public_works_director",
  "maintenance_supervisor",
  "maintenance_planner",
  "maintenance_engineer",
  "maintenance_coordinator",
  "maintenance_technician",
  "maintenance_mechanic",
  "general_maintenance_worker",
  "supplier",
];

export const contactCompany = [
  "Navada",
  "Sodem",
  "Plombier ParkSet",
  "Monsieur Électric",
  "Johnson Controls",
  "York",
  "Maxen",
  "Generac",
  "Regulvar",
  "Gestion Target",
  "Oasis",
];
