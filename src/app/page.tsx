import DashboardWidget from "@/components/dashboard/DashboardWidget";
import { AccountType } from "@/models/accounts/account";
import { WidgetItem } from "@/models/dashboard/widget-item";

const TEST_ITEMS: WidgetItem[] = [
  new WidgetItem("1", "Item 1", "SAVINGS", AccountType.Savings, "06/22/24", 69),
  new WidgetItem(
    "2",
    "Item 1",
    "CHECKING",
    AccountType.Checking,
    "06/22/24",
    420.69
  ),
  new WidgetItem(
    "3",
    "Item 1",
    "INVESTMENT",
    AccountType.Investment,
    "06/22/24",
    666
  ),
  new WidgetItem(
    "4",
    "Item 1",
    "MORTGAGE",
    AccountType.Mortgage,
    "06/22/24",
    1_000_000
  ),
  new WidgetItem(
    "5",
    "Item 1",
    "CREDIT",
    AccountType.Credit,
    "06/22/24",
    -1_000
  ),
];

export default function Home() {
  const incomeItems = TEST_ITEMS.filter(
    (item) => item.acctType === AccountType.Checking
  );
  const expenseItems = TEST_ITEMS.filter(
    (item) => item.acctType === AccountType.Credit
  );
  const assetItems = TEST_ITEMS.filter(
    (item) =>
      item.acctType === AccountType.Savings ||
      item.acctType === AccountType.Checking ||
      item.acctType === AccountType.Investment
  );
  const liabilityItems = TEST_ITEMS.filter(
    (item) =>
      item.acctType === AccountType.Mortgage ||
      item.acctType === AccountType.PersonalLoan ||
      item.acctType === AccountType.AutoLoan
  );

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="lg:flex lg:flex-wrap w-full h-full">
        <DashboardWidget name="Income" items={incomeItems} />
        <DashboardWidget name="Expenses" items={expenseItems} />
        <DashboardWidget name="Assets" items={assetItems} />
        <DashboardWidget name="Liabilities" items={liabilityItems} />
      </div>
    </div>
  );
}
