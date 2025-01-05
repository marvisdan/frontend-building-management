import { Asset } from "../../../types";
import { formatAssets } from "../formatAssets";

const data: Asset[] = [
  {
    url: "http://localhost:8000/assets/20848/",
    id: 20848,
    organizationsite: {
      id: 7,
      name: "Test site",
      address: "221B Baker street",
      organization: 3,
      created: "2021-07-22T18:34:28.655389",
      updated: "2021-07-22T18:35:14.776655",
    },
    assetcategory: 3,
    assettype: 5,
    organizationcontacts: [],
    name: "a-test",
    description: "cewee",
    thumbnail:
      "https://maxen-connect-storage-dev-local.s3.amazonaws.com/customers/thumbnails/02feeae9-e8e1-44d7-a990-3d0a816ac175.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2NKKH45EU25GYVG6%2F20230213%2Fca-central-1%2Fs3%2Faws4_request&X-Amz-Date=20230213T195210Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=92afedda13736447f3ca8b6d9783384636ceed8a47a88654a6f4abdc1afae34b",
    created: "2023-02-01T20:52:44.310770Z",
    updated: "2023-02-01T20:52:44.310793Z",
  },
  {
    url: "http://localhost:8000/assets/20850/",
    id: 20850,
    organizationsite: {
      id: 7,
      name: "Test site",
      address: "221B Baker street",
      organization: 3,
      created: "2021-07-22T18:34:28.655389",
      updated: "2021-07-22T18:35:14.776655",
    },
    assetcategory: 3,
    assettype: 5,
    organizationcontacts: [],
    name: "aaa",
    description: "cdec",
    thumbnail:
      "https://maxen-connect-storage-dev-local.s3.amazonaws.com/customers/thumbnails/5cd2ad06-9f2b-42ed-a0c7-5b96d16a0bdd.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2NKKH45EU25GYVG6%2F20230213%2Fca-central-1%2Fs3%2Faws4_request&X-Amz-Date=20230213T195210Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=6c14c8e0a38639dea8c7495181aa057d45412818ed58f94bbf1cd5b1f4990c42",
    created: "2023-02-10T16:52:29.539611Z",
    updated: "2023-02-10T16:52:29.539661Z",
  },
  {
    url: "http://localhost:8000/assets/4541/",
    id: 4541,
    organizationsite: {
      id: 7,
      name: "Test site",
      address: "221B Baker street",
      organization: 3,
      created: "2021-07-22T18:34:28.655389",
      updated: "2021-07-22T18:35:14.776655",
    },
    assetcategory: 3,
    assettype: 6,
    organizationcontacts: [],
    name: "BA",
    description: "awsome descirption",

    thumbnail:
      "https://maxen-connect-storage-dev-local.s3.amazonaws.com/customers/thumbnails/7dd92f16-b20b-4ffc-ae47-dbc44b47d8a5.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2NKKH45EU25GYVG6%2F20230213%2Fca-central-1%2Fs3%2Faws4_request&X-Amz-Date=20230213T195210Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=5189a095128aad2a6b1cf721fc164e325503799c4c1f2b3023d3215977168bc1",
    created: "2021-08-06T17:42:00.688703Z",
    updated: "2021-12-20T23:50:42.716284Z",
  },
];

describe("formatAssets helper", () => {
  it("should return empty array when data is empty", () => {
    expect(formatAssets([])).toEqual([]);
  });

  it("should format assets infos as expected", () => {
    const result = [
      {
        assetcategory: 3,
        assettype: 5,
        created: "2023-02-01T20:52:44.310770Z",
        description: "cewee",
        id: 0,
        name: "a-test",
        thumbnail:
          "https://maxen-connect-storage-dev-local.s3.amazonaws.com/customers/thumbnails/02feeae9-e8e1-44d7-a990-3d0a816ac175.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2NKKH45EU25GYVG6%2F20230213%2Fca-central-1%2Fs3%2Faws4_request&X-Amz-Date=20230213T195210Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=92afedda13736447f3ca8b6d9783384636ceed8a47a88654a6f4abdc1afae34b",
        updated: "2023-02-01T20:52:44.310793Z",
        url: "http://localhost:8000/assets/20848/",
      },
      {
        assetcategory: 3,
        assettype: 5,
        created: "2023-02-10T16:52:29.539611Z",
        description: "cdec",
        id: 1,
        name: "aaa",
        thumbnail:
          "https://maxen-connect-storage-dev-local.s3.amazonaws.com/customers/thumbnails/5cd2ad06-9f2b-42ed-a0c7-5b96d16a0bdd.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2NKKH45EU25GYVG6%2F20230213%2Fca-central-1%2Fs3%2Faws4_request&X-Amz-Date=20230213T195210Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=6c14c8e0a38639dea8c7495181aa057d45412818ed58f94bbf1cd5b1f4990c42",
        updated: "2023-02-10T16:52:29.539661Z",
        url: "http://localhost:8000/assets/20850/",
      },
      {
        assetcategory: 3,
        assettype: 6,
        created: "2021-08-06T17:42:00.688703Z",
        description: "awsome descirption",
        id: 2,
        name: "BA",
        thumbnail:
          "https://maxen-connect-storage-dev-local.s3.amazonaws.com/customers/thumbnails/7dd92f16-b20b-4ffc-ae47-dbc44b47d8a5.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2NKKH45EU25GYVG6%2F20230213%2Fca-central-1%2Fs3%2Faws4_request&X-Amz-Date=20230213T195210Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=5189a095128aad2a6b1cf721fc164e325503799c4c1f2b3023d3215977168bc1",
        updated: "2021-12-20T23:50:42.716284Z",
        url: "http://localhost:8000/assets/4541/",
      },
    ];
    expect(formatAssets(data)).toEqual(result);
  });
});
