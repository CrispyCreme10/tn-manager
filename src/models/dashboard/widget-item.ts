import { AccountType } from "@/models/accounts/account";
import { formatNumber } from "@/utils/currency";

type AccountTypeAmountColorOpts =
  | "text-red-500"
  | "text-green-500"
  | "text-current";

const ACCT_TYPE_DEBIT_MAP: {
  [key in AccountType]: AccountTypeAmountColorOpts;
} = {
  [AccountType.Checking]: "text-green-500",
  [AccountType.Savings]: "text-current",
  [AccountType.Credit]: "text-red-500",
  [AccountType.Investment]: "text-green-500",
  [AccountType.PersonalLoan]: "text-red-500",
  [AccountType.Mortgage]: "text-red-500",
  [AccountType.AutoLoan]: "text-red-500",
  [AccountType.BusinessChecking]: "text-green-500",
  [AccountType.BusinessSavings]: "text-current",
  [AccountType.BusinessCredit]: "text-red-500",
  [AccountType.Custodial]: "text-current",
};

const ACCT_TYPE_CREDIT_MAP: {
  [key in AccountType]: AccountTypeAmountColorOpts;
} = {
  [AccountType.Checking]: "text-red-500",
  [AccountType.Savings]: "text-current",
  [AccountType.Credit]: "text-green-500",
  [AccountType.Investment]: "text-red-500",
  [AccountType.PersonalLoan]: "text-green-500",
  [AccountType.Mortgage]: "text-green-500",
  [AccountType.AutoLoan]: "text-green-500",
  [AccountType.BusinessChecking]: "text-red-500",
  [AccountType.BusinessSavings]: "text-current",
  [AccountType.BusinessCredit]: "text-green-500",
  [AccountType.Custodial]: "text-current",
};

export class WidgetItem {
  constructor(
    public id: string,
    public name: string,
    public acctName: string,
    public acctType: AccountType,
    public tranDate: string,
    public tranAmt: number
  ) {}

  public get formattedAmount(): string {
    const fmtAmt = formatNumber(this.tranAmt);

    return this.tranAmt > 0 ? `+${fmtAmt}` : fmtAmt;
  }

  public get amountColor(): AccountTypeAmountColorOpts {
    if (this.tranAmt < 0) {
      return ACCT_TYPE_CREDIT_MAP[this.acctType];
    } else {
      return ACCT_TYPE_DEBIT_MAP[this.acctType];
    }
  }
}
