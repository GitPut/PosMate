export type AddressType =
  | {
      label: string;
      value: {
        description: string;
        matched_substrings: [
          {
            length: number;
            offset: number;
          },
          {
            length: number;
            offset: number;
          }
        ];
        place_id: string;
        reference: string;
        structured_formatting: {
          main_text: string;
          secondary_text: string;
        };
      };
    }
  | "";
