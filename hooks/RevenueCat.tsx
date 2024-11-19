import { useEffect, useState } from "react";
import Purchases, {
  CustomerInfo,
  PurchasesPackage,
} from "react-native-purchases";
import Offering from "react-native-purchases";

// Subscription identifiers
const subIdentifiers = {
  weekly: "werewolf_pro_weekly",
  monthly: "werewolf_pro_monthly",
  yearly: "werewolf_pro_yearly",
};

// TypeScript types for the data structures
interface CustomOffering extends Offering {
  [key: string]: PurchasesPackage | undefined;
}

export default function useRevenueCat() {
  const [currentOffering, setCurrentOffering] = useState<CustomOffering | null>(
    null
  );
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);

  const isProMember =
    customerInfo?.entitlements?.active?.werewolf_subscriptions;

  useEffect(() => {
    const fetchData = async () => {
      try {
        Purchases.configure({
          apiKey: process.env.EXPO_PUBLIC_REVENUECAT_API_KEY ?? "",
        });

        const offerings = await Purchases.getOfferings();
        const customerInfo = await Purchases.getCustomerInfo();

        setCurrentOffering(offerings.current as any);
        setCustomerInfo(customerInfo);
      } catch (error) {
        console.error("Error fetching RevenueCat data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const customerInfoUpdated = async (purchaserInfo: CustomerInfo) => {
      setCustomerInfo(purchaserInfo);
    };

    Purchases.addCustomerInfoUpdateListener(customerInfoUpdated);
  }, []);

  return { currentOffering, customerInfo, isProMember };
}
