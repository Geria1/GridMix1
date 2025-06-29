import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle, Mail } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface NewsletterSignupProps {
  title?: string;
  description?: string;
  source?: string;
  variant?: "card" | "inline" | "footer";
  showName?: boolean;
  compact?: boolean;
}

export function NewsletterSignup({ 
  title = "Stay Updated", 
  description = "Get notified about the latest UK energy insights and carbon intensity updates.",
  source = "website",
  variant = "card",
  showName = false,
  compact = false
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName: showName ? firstName : undefined,
          lastName: showName ? lastName : undefined,
          source
        })
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
        setFirstName("");
        setLastName("");
      } else {
        setStatus("error");
        setMessage(data.message);
      }
    } catch (error: any) {
      setStatus("error");
      setMessage(error.message || "Something went wrong. Please try again.");
    }
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-3">
      {showName && (
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="text-sm"
          />
          <Input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="text-sm"
          />
        </div>
      )}
      
      <div className={compact ? "flex gap-2" : "space-y-2"}>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === "loading"}
          className={compact ? "flex-1" : ""}
        />
        <Button 
          type="submit" 
          disabled={status === "loading" || !email}
          className="bg-blue-600 hover:bg-blue-700 text-white min-w-fit"
        >
          {status === "loading" ? (
            "Subscribing..."
          ) : (
            <>
              <Mail className="w-4 h-4 mr-2" />
              Subscribe
            </>
          )}
        </Button>
      </div>

      {status === "success" && (
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm">
          <CheckCircle className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      <p className="text-xs text-gray-500 dark:text-gray-400">
        By subscribing, you agree to receive updates from GridMix. 
        <br />
        You can unsubscribe at any time. We respect your privacy.
      </p>
    </form>
  );

  if (variant === "inline") {
    return (
      <div className="max-w-md">
        {!compact && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {description}
            </p>
          </div>
        )}
        {renderForm()}
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div className="max-w-sm">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h4>
        {renderForm()}
      </div>
    );
  }

  return (
    <Card className="border-gray-200 dark:border-gray-700">
      <CardHeader className={compact ? "pb-3" : ""}>
        <CardTitle className={`${compact ? "text-lg" : "text-xl"} font-semibold text-gray-900 dark:text-white`}>
          {title}
        </CardTitle>
        {!compact && (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {description}
          </p>
        )}
      </CardHeader>
      <CardContent>
        {renderForm()}
      </CardContent>
    </Card>
  );
}