import { WidgetItem as Item } from "@/models/dashboard/widget-item";

export default function WidgetItem({ item }: { item: Item }) {
  const colorVariants = {
    green: "w-1/4 text-green-500",
    red: "w-1/4 text-red-500",
    current: "w-1/4 text-current",
  }

  const getAmountColor = (): string => {
    switch(item.transactionType) {
      case -1:
        return colorVariants.red;
      case 1:
        return colorVariants.green;
      case 0:
        return colorVariants.current;
      default:
        return colorVariants.current;
    }
  }

  return (
    <tr className="flex justify-between w-full px-2 py-3 md:px-4 border-b-2 last:border-b-0 border-sky-500">
      <td className="w-1/4">
        <h1>{item.name}</h1>
      </td>
      <td className="w-1/4">
        <p>{item.acctName}</p>
      </td>
      <td className="w-1/4">
        <p>{item.tranDate}</p>
      </td>
      <td className={`${getAmountColor()}`}>
        <p>{item.formattedAmount}</p>
      </td>
    </tr>
  );
}
