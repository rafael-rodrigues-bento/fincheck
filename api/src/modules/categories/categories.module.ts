import { Module } from '@nestjs/common'
import { CategoriesController } from './categories.controller'
import { ValidateCategoryOwnershipService } from './services/validate-category-ownership.service'
import { CategoriesService } from './services/categories.service'

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, ValidateCategoryOwnershipService],
  exports: [ValidateCategoryOwnershipService],
})
export class CategoriesModule {}
