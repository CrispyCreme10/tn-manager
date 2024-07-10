import { AccountType } from "@/models/accounts/account";
import { formatNumber } from "@/utils/currency";

type TransactionType =
  | -1
  | 1
  | 0;

const ACCT_TYPE_DEBIT_MAP: {
  [key in AccountType]: TransactionType;
} = {
  [AccountType.Checking]: 1,
  [AccountType.Savings]: 0,
  [AccountType.Credit]: -1,
  [AccountType.Investment]: 1,
  [AccountType.PersonalLoan]: -1,
  [AccountType.Mortgage]: -1,
  [AccountType.AutoLoan]: -1,
  [AccountType.BusinessChecking]: 1,
  [AccountType.BusinessSavings]: 0,
  [AccountType.BusinessCredit]: -1,
  [AccountType.Custodial]: 0,
};

const ACCT_TYPE_CREDIT_MAP: {
  [key in AccountType]: TransactionType;
} = {
  [AccountType.Checking]: -1,
  [AccountType.Savings]: 0,
  [AccountType.Credit]: 1,
  [AccountType.Investment]: -1,
  [AccountType.PersonalLoan]: 1,
  [AccountType.Mortgage]: 1,
  [AccountType.AutoLoan]: 1,
  [AccountType.BusinessChecking]: -1,
  [AccountType.BusinessSavings]: 0,
  [AccountType.BusinessCredit]: 1,
  [AccountType.Custodial]: 0,
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

  public get transactionType(): TransactionType {
    if (this.tranAmt < 0) {
      return ACCT_TYPE_CREDIT_MAP[this.acctType];
    } else {
      return ACCT_TYPE_DEBIT_MAP[this.acctType];
    }
  }
}
