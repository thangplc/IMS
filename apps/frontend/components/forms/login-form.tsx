"use client";

import { useState } from "react";
import { useLogin } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  parseError,
  getErrorDisplayInfo,
  logError,
  type AppError,
} from "@/lib/error-handler";
import {
  ExclamationTriangleIcon,
  ShieldExclamationIcon,
  WifiIcon,
  ServerIcon,
  ClockIcon,
  ArrowPathIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { MESSAGES } from "@/constants/messages";
import { LABELS } from "@/constants/labels";

interface LoginFormProps {
  onLoadingChange?: (isLoading: boolean) => void;
}

export function LoginForm({ onLoadingChange }: LoginFormProps = {}) {
  const login = useLogin();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [errorState, setErrorState] = useState<AppError | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = MESSAGES.VALIDATION.EMAIL_REQUIRED;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = MESSAGES.VALIDATION.EMAIL_INVALID;
    }

    if (!formData.password) {
      newErrors.password = MESSAGES.VALIDATION.PASSWORD_REQUIRED;
    } else if (formData.password.length < 8) {
      newErrors.password = MESSAGES.VALIDATION.PASSWORD_MIN_LENGTH;
    }

    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRetry = () => {
    setErrorState(null);
    setRetryCount((prev) => prev + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Notify parent that loading started
    onLoadingChange?.(true);

    try {
      const result = await login.mutateAsync(formData);
      console.log("✅ Login successful in form:", result);

      // Clear errors
      setErrorState(null);
      setFieldErrors({});

      // Redirect to dashboard (cookie already set by backend)
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500);
    } catch (error: unknown) {
      // Parse error using utility
      const parsedError = parseError(error);

      // Log error for debugging
      logError(parsedError, "Login");

      // Set error state
      setErrorState(parsedError);

      // Notify parent that loading ended
      onLoadingChange?.(false);
    }
  };

  const getErrorIcon = (iconType: string) => {
    switch (iconType) {
      case "wifi":
        return <WifiIcon className="h-5 w-5" />;
      case "server":
        return <ServerIcon className="h-5 w-5" />;
      case "shield":
        return <ShieldExclamationIcon className="h-5 w-5" />;
      case "clock":
        return <ClockIcon className="h-5 w-5" />;
      case "question":
        return <QuestionMarkCircleIcon className="h-5 w-5" />;
      default:
        return <ExclamationTriangleIcon className="h-5 w-5" />;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="space-y-4">
        {/* Email Field */}
        <div>
          <Label htmlFor="email">{LABELS.AUTH.EMAIL}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              setErrorState(null); // Clear errors on input
            }}
            className={
              fieldErrors.email ? "border-red-500 focus:border-red-500" : ""
            }
            placeholder="admin@ims.com"
          />
          {fieldErrors.email && (
            <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
              <ExclamationTriangleIcon className="h-4 w-4" />
              {fieldErrors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <Label htmlFor="password">{LABELS.AUTH.PASSWORD}</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              setErrorState(null); // Clear errors on input
            }}
            className={
              fieldErrors.password ? "border-red-500 focus:border-red-500" : ""
            }
            placeholder="••••••••"
          />
          {fieldErrors.password && (
            <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
              <ExclamationTriangleIcon className="h-4 w-4" />
              {fieldErrors.password}
            </p>
          )}
        </div>
      </div>

      {/* Error Alert */}
      {errorState &&
        (() => {
          const displayInfo = getErrorDisplayInfo(errorState);
          return (
            <div
              className={`rounded-lg border p-4 ${displayInfo.bgClass} animate-in fade-in-50 slide-in-from-top-2 duration-300`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getErrorIcon(displayInfo.icon)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{errorState.message}</p>
                  {errorState.type === "rate_limit" && (
                    <p className="mt-1 text-xs opacity-80">
                      Để bảo vệ hệ thống, chúng tôi tạm thời giới hạn số lần
                      đăng nhập.
                    </p>
                  )}
                  {errorState.type === "network" && (
                    <p className="mt-1 text-xs opacity-80">
                      Kiểm tra: WiFi/4G đang bật, không bật chế độ máy bay.
                    </p>
                  )}
                </div>
              </div>
              {errorState.canRetry && (
                <button
                  type="button"
                  onClick={handleRetry}
                  className="mt-3 flex items-center gap-2 text-sm font-medium hover:underline"
                >
              <ArrowPathIcon className="h-4 w-4" />
              {MESSAGES.COMMON.RETRY}
                </button>
              )}
            </div>
          );
        })()}

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={login.isPending}>
        {LABELS.AUTH.LOGIN}
      </Button>
    </form>
  );
}
