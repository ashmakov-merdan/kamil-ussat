"use client"
import { useOrders } from "@/api/queries/orders";
import { AdminPage } from "@/components";
import { Pagination } from "@/shared";
import { useLocale, useTranslations } from "next-intl";
import { FC } from "react";

const OrderItem: FC<{ order: IOrder }> = ({ order }) => {
  const locale = useLocale();

  return (
    <div className="grid grid-cols-6 md:grid-cols-12 items-center px-3 py-4">
      <div className="col-span-1 text-center text-sm text-[#344054] dark:text-[#CECFD2]">
        {order.id}
      </div>
      <div className="col-span-5 md:col-span-3 flex flex-col">
        <h3 className="text-sm font-medium text-[#344054] dark:text-[#CECFD2]">
          {order.first_name} {order.last_name}
        </h3>
      </div>
      <div className="hidden md:block md:col-span-3 text-sm text-[#344054] dark:text-[#CECFD2]">
        {order.email}
      </div>
      <div className="hidden md:block md:col-span-3 text-sm text-[#344054] dark:text-[#CECFD2]">
        {(order.name as ILanguage)[locale as LanguageType]}
      </div>
    </div>
  );
};

const OrdersPage: FC = () => {
  const { orders, page, prevPage, nextPage } = useOrders();
  const t = useTranslations();

  return (
    <section id={"orders"}>
      <AdminPage title={t("section.orders")}>
        <div className="grid grid-cols-6 md:grid-cols-12 bg-gray-50 dark:bg-[#161B26]">
          <div className="p-3 col-span-1 text-center font-medium text-[#344054] dark:text-[#CECFD2]">
            #
          </div>
          <div className="p-3 col-span-5 md:col-span-3 font-medium text-[#344054] dark:text-[#CECFD2]">
            {t("fields.name")}
          </div>
          <div className="p-3 hidden md:block md:col-span-3 font-medium text-[#344054] dark:text-[#CECFD2]">
            {t("fields.email")}
          </div>
          <div className="p-3 hidden md:block md:col-span-3 font-medium text-[#344054] dark:text-[#CECFD2]">
            {t("columns.service")}
          </div>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {orders.map((order) => (
            <OrderItem
              key={order.id}
              order={order}
            />
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={page}
            nextPage={nextPage}
            prevPage={prevPage}
            length={orders?.length || 0}
          />
        </div>
      </AdminPage>
    </section>
  );
};

export default OrdersPage;