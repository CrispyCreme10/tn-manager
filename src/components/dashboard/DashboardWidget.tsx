import WidgetItem from "@/components/dashboard/WidgetItem";
import { WidgetItem as Item } from "@/models/dashboard/widget-item";

export default function DashboardWidget({
  name,
  items,
}: {
  name: string;
  items: Item[];
}) {
  const widgetItems = items.map((item) => {
    return <WidgetItem key={item.id} item={item} />;
  });

  return (
    <div className="w-full lg:basis-6/12 p-2">
      <div className="w-full lg:h-full border border-sky-500 rounded-lg">
        <h1 className="text-xl text-center py-2 border-b-2 border-b-sky-200 font-semibold">
          {name}
        </h1>
        <table className="w-full">
          <tbody>{widgetItems}</tbody>
        </table>
      </div>
    </div>
  );
}
