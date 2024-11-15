/**
 * v0 by Vercel.
 * @see https://v0.dev/t/MWJxxKsryNr
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from '@/components/ui/collapsible';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { memo, useState } from 'react';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

function IndetailMarksModal({ data }: any) {
  const [openCollapsible, setOpenCollapsible] = useState<string | null>(null);

  const handleCollapsibleOpen = (collapsibleName: string | null) => {
    setOpenCollapsible(collapsibleName);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-7 px-2 py-1">View More</Button>
      </DialogTrigger>
      <DialogContent className="h-3/4 overflow-y-scroll sm:max-w-[800px]">
        <div className="flex w-full items-center justify-between border-b pb-4">
          <DialogTitle>{data.shopName}</DialogTitle>
          <p className="mr-4">👤 {data.employeeDetailsChanged}</p>
        </div>
        <div className="space-y-4 py-4">
          <Collapsible
            open={openCollapsible === 'qp'}
            onOpenChange={() => {
              openCollapsible == null
                ? handleCollapsibleOpen('qp')
                : handleCollapsibleOpen(null);
            }}
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-muted px-4 py-3">
              <div className="flex w-full items-center justify-between">
                <h4 className="text-sm font-semibold">Quality Products</h4>
                <div className="flex items-center justify-end">
                  <p className="text-right text-xs font-semibold">
                    Total Average:{' '}
                    <span className="text-yellow-500">
                      {data.totalAvgOfQualityProduct}
                    </span>
                    , &nbsp;
                  </p>
                  <p className="text-right text-xs font-semibold">
                    Specific Store Average:{' '}
                    <span
                      className={
                        Number(data.totalAvgOfQualityProduct) >
                        Number(data.specificStoreAvgOfQualityProduct)
                          ? `text-red-500`
                          : 'text-green-500'
                      }
                    >
                      {data.specificStoreAvgOfQualityProduct}
                    </span>
                  </p>
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableHead className="w-1/2">Shelves Temperature</TableHead>
                    <TableCell
                      className={
                        data.shelvesTemperature == '0'
                          ? 'text-red-500'
                          : 'text-green-500'
                      }
                    >
                      {data.shelvesTemperature}
                    </TableCell>
                    <TableCell>
                      <a
                        className="text-blue-500 hover:text-blue-700"
                        href={data.shelvesTemperatureLink || ''}
                        target="_blank"
                      >
                        View Image
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Shelves Temperature Remark
                    </TableHead>
                    <TableCell>{data.shelvesTemperatureRemark}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">Freshness of Goods</TableHead>
                    <TableCell
                      className={
                        data.freshnessOfGoods == '0'
                          ? 'text-red-500'
                          : 'text-green-500'
                      }
                    >
                      {data.freshnessOfGoods}
                    </TableCell>
                    <TableCell>
                      <a
                        className="text-blue-500 hover:text-blue-700"
                        href={data.freshnessOfGoodsLink || ''}
                        target="_blank"
                      >
                        View Image
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Freshness of Goods Remark
                    </TableHead>
                    <TableCell>{data.freshnessOfGoodsRemark}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">Variety of Goods</TableHead>
                    <TableCell
                      className={
                        data.varietyOfGoods == '0'
                          ? 'text-red-500'
                          : 'text-green-500'
                      }
                    >
                      {data.varietyOfGoods}
                    </TableCell>
                    <TableCell>
                      <a
                        className="text-blue-500 hover:text-blue-700"
                        href={data.varietyOfGoodsLink || ''}
                        target="_blank"
                      >
                        View Image
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Variety of Goods Remark
                    </TableHead>
                    <TableCell>{data.varietyOfGoodsRemark}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Presentation of Packaging Items
                    </TableHead>
                    <TableCell
                      className={
                        data.presentationOfPackagingItems == '0'
                          ? 'text-red-500'
                          : 'text-green-500'
                      }
                    >
                      {data.presentationOfPackagingItems}
                    </TableCell>
                    <TableCell>
                      <a
                        className="text-blue-500 hover:text-blue-700"
                        href={data.presentationOfPackagingItemsLink || ''}
                        target="_blank"
                      >
                        View Image
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Presentation of Packaging Items Remark
                    </TableHead>
                    <TableCell>
                      {data.presentationOfPackagingItemsRemark}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CollapsibleContent>
          </Collapsible>
          <Collapsible
            open={openCollapsible === 'sttc'}
            onOpenChange={() => {
              openCollapsible == null
                ? handleCollapsibleOpen('sttc')
                : handleCollapsibleOpen(null);
            }}
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-muted px-4 py-3">
              <h4 className="text-sm font-semibold">Service to the customer</h4>
              <div className="flex items-center justify-end">
                <p className="text-right text-xs font-semibold">
                  Total Average:{' '}
                  <span className="text-yellow-500">
                    {data.totalAvgOfService}
                  </span>
                  , &nbsp;
                </p>
                <p className="text-right text-xs font-semibold">
                  Specific Store Average:{' '}
                  <span
                    className={
                      Number(data.totalAvgOfService) >
                      Number(data.specificStoreAvgOfService)
                        ? `text-red-500`
                        : 'text-green-500'
                    }
                  >
                    {data.specificStoreAvgOfService}
                  </span>
                </p>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableHead className="w-1/2">Customer Greeting</TableHead>
                    <TableCell
                      className={
                        data.customerGreeting == '0'
                          ? 'text-red-500'
                          : 'text-green-500'
                      }
                    >
                      {data.customerGreeting}
                    </TableCell>
                    <TableCell>
                      <a
                        className="text-blue-500 hover:text-blue-700"
                        href={data.customerGreetingLink || ''}
                        target="_blank"
                      >
                        View Image
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Customer Greeting Remark
                    </TableHead>
                    <TableCell>{data.customerGreetingRemark}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Knowledge Of Products
                    </TableHead>
                    <TableCell
                      className={
                        data.knowledgeOfProducts == '0'
                          ? 'text-red-500'
                          : 'text-green-500'
                      }
                    >
                      {data.knowledgeOfProducts}
                    </TableCell>
                    <TableCell>
                      <a
                        className="text-blue-500 hover:text-blue-700"
                        href={data.knowledgeOfProductsLink || ''}
                        target="_blank"
                      >
                        View Image
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Knowledge Of Products Remark
                    </TableHead>
                    <TableCell>{data.knowledgeOfProductsRemark}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Convincing Customer For Phone Number
                    </TableHead>
                    <TableCell
                      className={
                        data.convincingCustomerForPhoneNumber == '0'
                          ? 'text-red-500'
                          : 'text-green-500'
                      }
                    >
                      {data.convincingCustomerForPhoneNumber}
                    </TableCell>
                    <TableCell>
                      <a
                        className="text-blue-500 hover:text-blue-700"
                        href={data.convincingCustomerForPhoneNumberLink || ''}
                        target="_blank"
                      >
                        View Image
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Convincing Customer For Phone Number Remark
                    </TableHead>
                    <TableCell>
                      {data.convincingCustomerForPhoneNumberRemark}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Handling Customer Complaints And Inquiries
                    </TableHead>
                    <TableCell
                      className={
                        data.handlingCustomerComplaintsAndInquiries == ''
                          ? 'text-red-500'
                          : 'text-green-500'
                      }
                    >
                      {data.handlingCustomerComplaintsAndInquiries}
                    </TableCell>
                    <TableCell>
                      <a
                        className="text-blue-500 hover:text-blue-700"
                        href={
                          data.handlingCustomerComplaintsAndInquiriesLink || ''
                        }
                        target="_blank"
                      >
                        View Image
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Handling Customer Complaints And Inquiries Remark
                    </TableHead>
                    <TableCell>
                      {data.handlingCustomerComplaintsAndInquiriesRemark}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Cleanliness Of Store
                    </TableHead>
                    <TableCell
                      className={
                        data.cleanlinessOfStore == ''
                          ? 'text-red-500'
                          : 'text-green-500'
                      }
                    >
                      {data.cleanlinessOfStore}
                    </TableCell>
                    <TableCell>
                      <a
                        className="text-blue-500 hover:text-blue-700"
                        href={data.cleanlinessOfStoreLink || ''}
                        target="_blank"
                      >
                        View Image
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Cleanliness Of Store Remark
                    </TableHead>
                    <TableCell>{data.cleanlinessOfStoreRemark}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Atmosphere And Decor
                    </TableHead>
                    <TableCell
                      className={
                        data.atmosphereAndDecor == ''
                          ? 'text-red-500'
                          : 'text-green-500'
                      }
                    >
                      {data.atmosphereAndDecor}
                    </TableCell>
                    <TableCell>
                      <a
                        className="text-blue-500 hover:text-blue-700"
                        href={data.atmosphereAndDecorLink || ''}
                        target="_blank"
                      >
                        View Image
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Atmosphere And Decor Remark
                    </TableHead>
                    <TableCell>{data.atmosphereAndDecorRemark}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CollapsibleContent>
          </Collapsible>
          <Collapsible
            open={openCollapsible === 'vaas'}
            onOpenChange={() => {
              openCollapsible == null
                ? handleCollapsibleOpen('vaas')
                : handleCollapsibleOpen(null);
            }}
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-muted px-4 py-3">
              <h4 className="text-sm font-semibold">
                Visibility And Accessibility of the shop
              </h4>
              <div className="flex items-center justify-end">
                <p className="text-right text-xs font-semibold">
                  Total Average:{' '}
                  <span className="text-yellow-500">
                    {data.totalAvgOfVisibility}
                  </span>
                  , &nbsp;
                </p>
                <p className="text-right text-xs font-semibold">
                  Specific Store Average:{' '}
                  <span
                    className={
                      Number(data.totalAvgOfVisibility) >
                      Number(data.specificStoreAvgOfVisibility)
                        ? `text-red-500`
                        : 'text-green-500'
                    }
                  >
                    {data.specificStoreAvgOfVisibility}
                  </span>
                </p>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Clean Exterior Signage
                    </TableHead>
                    <TableCell
                      className={
                        data.cleanExteriorSignage == '0'
                          ? 'text-red-500'
                          : 'text-green-500'
                      }
                    >
                      {data.cleanExteriorSignage}
                    </TableCell>
                    {data.cleanExteriorSignage == '0' ? (
                      <TableCell>
                        <a
                          className="text-blue-500 hover:text-blue-700"
                          href={data.cleanExteriorSignageLink || ''}
                          target="_blank"
                        >
                          View Image
                        </a>
                      </TableCell>
                    ) : (
                      ''
                    )}
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Clean Exterior Signage Remark
                    </TableHead>
                    <TableCell>{data.cleanExteriorSignageRemark}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">Ease Of Access</TableHead>
                    <TableCell
                      className={
                        data.easeOfAccess == '0'
                          ? 'text-red-500'
                          : 'text-green-500'
                      }
                    >
                      {data.easeOfAccess}
                    </TableCell>
                    <TableCell>
                      <a
                        className="text-blue-500 hover:text-blue-700"
                        href={data.easeOfAccessLink || ''}
                        target="_blank"
                      >
                        View Image
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Ease Of Access Remark
                    </TableHead>
                    <TableCell>{data.easeOfAccessRemark}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">Facade Maintained</TableHead>
                    <TableCell
                      className={
                        data.facadeMaintained == '0'
                          ? 'text-red-500'
                          : 'text-green-500'
                      }
                    >
                      {data.facadeMaintained}
                    </TableCell>
                    <TableCell>
                      <a
                        className="text-blue-500 hover:text-blue-700"
                        href={data.facadeMaintainedLink || ''}
                        target="_blank"
                      >
                        View Image
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Facade Maintained Remark
                    </TableHead>
                    <TableCell>{data.facadeMaintainedRemark}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CollapsibleContent>
          </Collapsible>
          <Collapsible
            open={openCollapsible === 'ktca'}
            onOpenChange={() => {
              openCollapsible == null
                ? handleCollapsibleOpen('ktca')
                : handleCollapsibleOpen(null);
            }}
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-muted px-4 py-3">
              <h4 className="text-sm font-semibold">
                Knowledge of Trading area and CRM Activities
              </h4>
              <div className="flex items-center justify-end">
                <p className="text-right text-xs font-semibold">
                  Total Average:{' '}
                  <span className="text-yellow-500">
                    {data.totalAvgOfKnowledge}
                  </span>
                  , &nbsp;
                </p>
                <p className="text-right text-xs font-semibold">
                  Specific Store Average:{' '}
                  <span
                    className={
                      Number(data.totalAvgOfKnowledge) >
                      Number(data.specificStoreAvgOfKnowledge)
                        ? `text-red-500`
                        : 'text-green-500'
                    }
                  >
                    {data.specificStoreAvgOfKnowledge}
                  </span>
                </p>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Understanding Of Local Market
                    </TableHead>
                    <TableCell
                      className={
                        data.understandingOfLocalMarket == '0'
                          ? 'text-red-500'
                          : 'text-green-500'
                      }
                    >
                      {data.understandingOfLocalMarket}
                    </TableCell>
                    <TableCell>
                      <a
                        className="text-blue-500 hover:text-blue-700"
                        href={data.understandingOfLocalMarketLink || ''}
                        target="_blank"
                      >
                        View Image
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Understanding Of Local Market Remark
                    </TableHead>
                    <TableCell>
                      {data.understandingOfLocalMarketRemark}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">CRM Activities</TableHead>
                    <TableCell
                      className={
                        data.crmActivities == '0'
                          ? 'text-red-500'
                          : 'text-green-500'
                      }
                    >
                      {data.crmActivities}
                    </TableCell>
                    <TableCell>
                      <a
                        className="text-blue-500 hover:text-blue-700"
                        href={data.crmActivitiesLink || ''}
                        target="_blank"
                      >
                        View Image
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      CRM Activities Remark
                    </TableHead>
                    <TableCell>{data.crmActivitiesRemark}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Competitor Awareness
                    </TableHead>
                    <TableCell
                      className={
                        data.competitorAwareness == '0'
                          ? 'text-red-500'
                          : 'text-green-500'
                      }
                    >
                      {data.competitorAwareness}
                    </TableCell>
                    <TableCell>
                      <a
                        className="text-blue-500 hover:text-blue-700"
                        href={data.competitorAwarenessLink || ''}
                        target="_blank"
                      >
                        View Image
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Competitor Awareness Remark
                    </TableHead>
                    <TableCell>{data.competitorAwarenessRemark}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CollapsibleContent>
          </Collapsible>
          <Collapsible
            open={openCollapsible === 'mcmp'}
            onOpenChange={() => {
              openCollapsible == null
                ? handleCollapsibleOpen('mcmp')
                : handleCollapsibleOpen(null);
            }}
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-muted px-4 py-3">
              <h4 className="text-sm font-semibold">
                Marketing Collateral Management and Promotions
              </h4>
              <div className="flex items-center justify-end">
                <p className="text-right text-xs font-semibold">
                  Total Average:{' '}
                  <span className="text-yellow-500">
                    {data.totalAvgOfMarketing}
                  </span>
                  , &nbsp;
                </p>
                <p className="text-right text-xs font-semibold">
                  Specific Store Average:{' '}
                  <span
                    className={
                      Number(data.totalAvgOfMarketing) >
                      Number(data.specificStoreAvgOfMarketing)
                        ? `text-red-500`
                        : 'text-green-500'
                    }
                  >
                    {data.specificStoreAvgOfMarketing}
                  </span>
                </p>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Execution Of Promotional Activities
                    </TableHead>
                    <TableCell
                      className={
                        data.executionOfPromotionalActivities == '0'
                          ? 'text-red-500'
                          : 'text-green-500'
                      }
                    >
                      {data.executionOfPromotionalActivities}
                    </TableCell>
                    <TableCell>
                      <a
                        className="text-blue-500 hover:text-blue-700"
                        href={data.executionOfPromotionalActivitiesLink || ''}
                        target="_blank"
                      >
                        View Image
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Execution Of Promotional Activities Remark
                    </TableHead>
                    <TableCell>
                      {data.executionOfPromotionalActivitiesRemark}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CollapsibleContent>
          </Collapsible>
          <Collapsible
            open={openCollapsible === 'tsba'}
            onOpenChange={() => {
              openCollapsible == null
                ? handleCollapsibleOpen('tsba')
                : handleCollapsibleOpen(null);
            }}
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-muted px-4 py-3">
              <h4 className="text-sm font-semibold">
                Training And Sales Building Activities
              </h4>
              <div className="flex items-center justify-end">
                <p className="text-right text-xs font-semibold">
                  Total Average:{' '}
                  <span className="text-yellow-500">
                    {data.totalAvgOfMarketing2}
                  </span>
                  , &nbsp;
                </p>
                <p className="text-right text-xs font-semibold">
                  Specific Store Average:{' '}
                  <span
                    className={
                      Number(data.totalAvgOfMarketing2) >
                      Number(data.specificStoreAvgOfMarketing2)
                        ? `text-red-500`
                        : 'text-green-500'
                    }
                  >
                    {data.specificStoreAvgOfMarketing2}
                  </span>
                </p>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Strategies To Upsell And Cross Sell
                    </TableHead>
                    <TableCell
                      className={
                        data.strategiesToUpsellAndCrossSell == '0'
                          ? 'text-red-500'
                          : 'text-green-500'
                      }
                    >
                      {data.strategiesToUpsellAndCrossSell}
                    </TableCell>
                    <TableCell>
                      <a
                        className="text-blue-500 hover:text-blue-700"
                        href={data.strategiesToUpsellAndCrossSellLink || ''}
                        target="_blank"
                      >
                        View Image
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Strategies To Upsell And Cross Sell Remark
                    </TableHead>
                    <TableCell>
                      {data.strategiesToUpsellAndCrossSellRemark}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Initiative At Local Level
                    </TableHead>
                    <TableCell
                      className={
                        data.initiativeAtLocalLevel == '0'
                          ? 'text-red-500'
                          : 'text-green-500'
                      }
                    >
                      {data.initiativeAtLocalLevel}
                    </TableCell>
                    <TableCell>
                      <a
                        className="text-blue-500 hover:text-blue-700"
                        href={data.initiativeAtLocalLevelLink || ''}
                        target="_blank"
                      >
                        View Image
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Initiative At Local Level Remark
                    </TableHead>
                    <TableCell>{data.initiativeAtLocalLevelRemark}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">KOC Filed</TableHead>
                    <TableCell
                      className={
                        data.kocFiled == '0' ? 'text-red-500' : 'text-green-500'
                      }
                    >
                      {data.kocFiled}
                    </TableCell>
                    <TableCell>
                      <a
                        className="text-blue-500 hover:text-blue-700"
                        href={data.kocFiledLink || ''}
                        target="_blank"
                      >
                        View Image
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">KOC Filed Remark</TableHead>
                    <TableCell>{data.kocFiledRemark}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Minimization Of Wastage Products
                    </TableHead>
                    <TableCell
                      className={
                        data.minimizationOfWastageProducts == '0'
                          ? 'text-red-500'
                          : 'text-green-500'
                      }
                    >
                      {data.minimizationOfWastageProducts}
                    </TableCell>
                    <TableCell>
                      <a
                        className="text-blue-500 hover:text-blue-700"
                        href={data.minimizationOfWastageProductsLink || ''}
                        target="_blank"
                      >
                        View Image
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Minimization Of Wastage Products Remark
                    </TableHead>
                    <TableCell>
                      {data.minimizationOfWastageProductsRemark}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Optimization Of Product Mix
                    </TableHead>
                    <TableCell
                      className={
                        data.optimizationOfProductMix == '0'
                          ? 'text-red-500'
                          : 'text-green-500'
                      }
                    >
                      {data.optimizationOfProductMix}
                    </TableCell>
                    <TableCell>
                      <a
                        className="text-blue-500 hover:text-blue-700"
                        href={data.optimizationOfProductMixLink || ''}
                        target="_blank"
                      >
                        View Image
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Optimization Of Product Mix Remark
                    </TableHead>
                    <TableCell>{data.optimizationOfProductMixRemark}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Management Of Online Sales
                    </TableHead>
                    <TableCell
                      className={
                        data.managementOfOnlineSales == '0'
                          ? 'text-red-500'
                          : 'text-green-500'
                      }
                    >
                      {data.managementOfOnlineSales}
                    </TableCell>
                    <TableCell>
                      <a
                        className="text-blue-500 hover:text-blue-700"
                        href={data.managementOfOnlineSalesLink || ''}
                        target="_blank"
                      >
                        View Image
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Management Of Online Sales Remark
                    </TableHead>
                    <TableCell>{data.managementOfOnlineSalesRemark}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Adherence To Operational Standards
                    </TableHead>
                    <TableCell
                      className={
                        data.adherenceToOperationalStandards == '0'
                          ? 'text-red-500'
                          : 'text-green-500'
                      }
                    >
                      {data.adherenceToOperationalStandards}
                    </TableCell>
                    <TableCell>
                      <a
                        className="text-blue-500 hover:text-blue-700"
                        href={data.adherenceToOperationalStandardsLink || ''}
                        target="_blank"
                      >
                        View Image
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead className="w-1/2">
                      Adherence To Operational Standards Remark
                    </TableHead>
                    <TableCell>
                      {data.adherenceToOperationalStandardsRemark}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CollapsibleContent>
          </Collapsible>
          <div className="grid gap-4 py-4">
            <div className="grid gap-1.5">
              <Label htmlFor="strength">Strength 💪</Label>
              <Textarea
                id="strength"
                readOnly
                className="min-h-[100px] italic"
                defaultValue={data.strength || 'N/A'}
              ></Textarea>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="opportunities">Opportunities 🎯</Label>
              <Textarea
                id="opportunities"
                readOnly
                className="min-h-[100px] italic"
                defaultValue={data.opportunities || 'N/A'}
              ></Textarea>
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="actionable">Actionable 💥</Label>
              <Textarea
                id="actionable"
                readOnly
                className="min-h-[100px] italic"
                defaultValue={data.actionable || 'N/A'}
              ></Textarea>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default memo(IndetailMarksModal);
