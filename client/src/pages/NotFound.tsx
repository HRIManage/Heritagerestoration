import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-canvas-textured">
      <Card className="w-full max-w-lg mx-4 border border-[#3F4143]/10 bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
        <CardContent className="pt-10 pb-10 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-[#8DBD42]/10 rounded-full animate-pulse" />
              <AlertCircle className="relative h-16 w-16 text-[#8DBD42]" />
            </div>
          </div>

          <h1 className="text-5xl font-bold text-[#3F4143] mb-2" style={{ fontFamily: "'Libre Caslon Text', serif" }}>404</h1>

          <h2 className="text-xl font-bold text-[#3F4143] mb-4" style={{ fontFamily: "'Libre Caslon Text', serif" }}>
            Page Not Found
          </h2>

          <p className="text-[#3F4143]/70 mb-8 leading-relaxed text-sm md:text-base">
            Sorry, the page you are looking for doesn't exist.
            <br />
            It may have been moved or deleted.
          </p>

          <div className="flex justify-center">
            <Button
              onClick={handleGoHome}
              className="bg-[#8DBD42] hover:bg-[#7bb843] text-white px-8 py-3 rounded-full font-bold transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
