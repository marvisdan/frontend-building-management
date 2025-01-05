import { User } from "../../types";

export const fetchUsersMock: User = {
  id: 5,
  username: "demo",
  name: "Maxen Town",
  first_name: "Maxen",
  last_name: "Town",
  email: "demo@maxentechnology.com",
  organizations: [],
  settings: {
    wallpaper:
      "https://maxen-connect-storage-dev-local.s3.amazonaws.com/customers/wallpapers/6913b75e-1756-4116-8a67-0ec940e9d2bb.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2NKKH45EU25GYVG6%2F20240115%2Fca-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240115T220256Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=e2c916bccc59e2e07d2dc44f1c09dfeab051a5be35d9f0c3d64e1e3d8a22b3ee",
    profile_picture:
      "https://maxen-connect-storage-dev-local.s3.amazonaws.com/customers/profile-pictures/3f1b3da2-1808-4905-93da-2c44eb3c0b49.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2NKKH45EU25GYVG6%2F20240115%2Fca-central-1%2Fs3%2Faws4_request&X-Amz-Date=20240115T220256Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=621705319ec1d09888d85820168e3e81949e90ddf3285df72e1a7d87c23e67dd",
  },
  rights: [],
};
