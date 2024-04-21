import { CustomerProp, TransListStateItem } from "types/global";

interface SearchDateProps {
  startDate: string; // Assuming ISO date string format
  endDate: string; // Assuming ISO date string format
  transactions: TransListStateItem[];
  customers?: CustomerProp[];
}

const SearchDate = ({
  startDate,
  endDate,
  transactions,
  customers,
}: SearchDateProps) => {
  if (!startDate || !endDate) {
    console.log("Start or end date not provided");
    return;
  }

  const startDateConverted = new Date(startDate);
  startDateConverted.setHours(0, 0, 0, 0); // Set to start of the day
  const endDateConverted = new Date(endDate);
  endDateConverted.setHours(23, 59, 59, 999); // Set to end of the day

  if (customers) {
    // Filter the list based on the date range
    const filtered = customers.filter((item) => {
      if (!item.createdAt) return false;
      const itemDate = new Date(item.createdAt.seconds * 1000);

      // const isCorrectFilter = search.length > 0 ? (item.id.toLowerCase().includes(search.toLowerCase()) || item.name.toLowerCase().includes(search.toLowerCase())) : true

      // Check if the item's date is within the start and end dates
      return itemDate >= startDateConverted && itemDate <= endDateConverted;
    });

    // Update the state with the filtered list
    return filtered;
  } else {
    // Filter the list based on the date range
    const filtered = transactions.filter((item) => {
      const itemDate = item.originalData?.date_created
      ? new Date(item.originalData.date_created)
      : item.originalData?.date ? new Date(item.originalData.date.seconds * 1000) : undefined;

      // const isCorrectFilter = search.length > 0 ? (item.id.toLowerCase().includes(search.toLowerCase()) || item.name.toLowerCase().includes(search.toLowerCase())) : true

      // Check if the item's date is within the start and end dates
      if(!itemDate) return false;
      return itemDate >= startDateConverted && itemDate <= endDateConverted;
    });

    // Update the state with the filtered list
    return filtered;
  }
};

export default SearchDate;
