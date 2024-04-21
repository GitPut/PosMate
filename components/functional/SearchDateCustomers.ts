import { CustomerProp } from "types/global";

interface SearchDateCustomersProps {
  startDate: string; // Assuming ISO date string format
  endDate: string; // Assuming ISO date string format
  customers: CustomerProp[];
}

const SearchDateCustomers = ({
  startDate,
  endDate,
  customers,
}: SearchDateCustomersProps) => {
  if (!startDate || !endDate) {
    return;
  }

  const startDateConverted = new Date(startDate);
  startDateConverted.setHours(0, 0, 0, 0); // Set to start of the day
  const endDateConverted = new Date(endDate);
  endDateConverted.setHours(23, 59, 59, 999); // Set to end of the day

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
};

export default SearchDateCustomers;
