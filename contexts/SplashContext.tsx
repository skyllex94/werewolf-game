import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";
import { Animated } from "react-native";

// Define the shape of the SplashContext
type SplashContextType = {
  isSplashVisible: boolean;
  fadeAnim: Animated.Value;
  hideSplash: () => void;
};

// Create the context
const SplashContext = createContext<SplashContextType | undefined>(undefined);

// Provider component
export const SplashProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Automatically hide the splash screen after 2 seconds
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setIsSplashVisible(false));
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Function to manually hide the splash screen
  const hideSplash = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setIsSplashVisible(false));
  };

  return (
    <SplashContext.Provider value={{ isSplashVisible, fadeAnim, hideSplash }}>
      {children}
    </SplashContext.Provider>
  );
};

// Custom hook to use the SplashContext
export const useSplash = (): SplashContextType => {
  const context = useContext(SplashContext);
  if (!context) {
    throw new Error("useSplash must be used within a SplashProvider");
  }
  return context;
};
