import { Module } from '@nestjs/common'
import { TransactionsController } from './transactions.controller'
import { TransactionsService } from './services/transactions.service'
import { BankAccountsModule } from '../bank-accounts/bank-accounts.module'
import { CategoriesModule } from '../categories/categories.module'
import { ValidateTransactionOwnershipService } from './services/validate-transaction-ownership.service'

@Module({
  imports: [BankAccountsModule, CategoriesModule],
  controllers: [TransactionsController],
  providers: [TransactionsService, ValidateTransactionOwnershipService],
})
export class TransactionsModule {}
