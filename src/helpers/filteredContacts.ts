import {
  AssetOrganizationContactType,
  OrganizationContactType,
} from "src/types";

export const filteredContacts = ({
  contacts,
  assetContacts,
}: {
  contacts: OrganizationContactType[];
  assetContacts: AssetOrganizationContactType[];
}) =>
  contacts?.length > 0
    ? contacts.reduce(
        (acc: OrganizationContactType[], contact: OrganizationContactType) => {
          const hasContact = Boolean(
            assetContacts &&
              assetContacts.find(
                (item: any) =>
                  item?.organizationcontact_details.id === contact.id
              )
          );

          if (!hasContact) {
            return [...acc, contact];
          }
          return acc;
        },
        []
      )
    : [];
