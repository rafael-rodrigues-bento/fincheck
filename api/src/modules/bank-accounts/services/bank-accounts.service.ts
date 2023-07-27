import { Injectable } from '@nestjs/common'
import { CreateBankAccountDto } from '../dto/create-bank-account.dto'
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto'
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories'
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service'

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepo: BankAccountsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
  ) {}

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { name, initialBalance, color, type } = createBankAccountDto

    return this.bankAccountsRepo.create({
      data: {
        userId,
        name,
        initialBalance,
        color,
        type,
      },
    })
  }

  // async findAllByUserId(userId: string) {
  //   const bankAccounts = await this.bankAccountsRepo.findMany({
  //     where: { userId },
  //     include: {
  //       transactions: {
  //         select: {
  //           type: true,
  //           value: true,
  //         },
  //       },
  //     },
  //   })

  //   return bankAccounts.map((bankAccount) => {
  //     const currentBalance = 0

  //     const totalTransactions = bankAccount.transactions.reduce(
  //       (acc, transaction) => acc + transaction.value,
  //       0,
  //     )

  //     return {
  //       totalTransactions,
  //       ...bankAccount,
  //       currentBalance,
  //     }
  //   })
  // }

  async update(
    bankAccountId: string,
    userId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    await this.validateBankAccountOwnershipService.validate(
      userId,
      bankAccountId,
    )

    const { name, initialBalance, color, type } = updateBankAccountDto

    return this.bankAccountsRepo.update({
      where: { id: bankAccountId },
      data: {
        name,
        initialBalance,
        color,
        type,
      },
    })
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnershipService.validate(
      userId,
      bankAccountId,
    )

    await this.bankAccountsRepo.delete({
      where: { id: bankAccountId },
    })

    return null
  }
}
