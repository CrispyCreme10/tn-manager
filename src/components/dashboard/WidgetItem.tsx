import { WidgetItem as Item } from "@/models/dashboard/widget-item";

export default function WidgetItem({ item }: { item: Item }) {
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
      <td className={`w-1/4 ${item.amountColor}`}>
        <p>{item.formattedAmount}</p>
      </td>
    </tr>
  );
}
