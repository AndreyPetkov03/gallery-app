import GradientBackground from "@/components/GradientBackground";
import { AuthProvider } from "@/components/AuthProvider";
import AuthenticatedApp from "@/components/AuthenticatedApp";

export default function Home() {
  return (
    <GradientBackground>
      <AuthProvider>
        <AuthenticatedApp />
      </AuthProvider>
    </GradientBackground>
  );
}
