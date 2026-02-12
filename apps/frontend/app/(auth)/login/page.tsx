"use client";

import { useState } from "react";
import { LoginForm } from "@/components/forms/login-form";
import { LoadingOverlay } from "@/components/ui/loading";
import { CubeIcon } from "@heroicons/react/24/solid";
import {
  ShieldCheckIcon,
  ChartBarIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/outline";
import { MESSAGES } from "@/constants/messages";
import { TITLES } from "@/constants/titles";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-12 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
          {/* Loading Overlay */}
          {isLoading && (
            <LoadingOverlay text={MESSAGES.AUTH.AUTHENTICATING_CREDENTIALS} size="md" />
          )}
        
        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 space-y-8">
          {/* Logo & Title */}
          <div className="text-center space-y-6">
            {/* Logo */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl blur-lg opacity-50" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-xl">
                  <CubeIcon className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {TITLES.APP.NAME}
              </h1>
              <h2 className="text-2xl font-semibold text-gray-900">
                {TITLES.PAGE.LOGIN}
              </h2>
              <p className="text-sm text-gray-600">
                {TITLES.APP.FULL_NAME}
              </p>
            </div>
          </div>

          {/* Login Form */}
          <LoginForm onLoadingChange={setIsLoading} />

          {/* Features */}
          <div className="pt-6 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="flex justify-center">
                  <ShieldCheckIcon className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-xs text-gray-600 font-medium">{TITLES.FEATURE.SECURITY}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-center">
                  <ChartBarIcon className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-xs text-gray-600 font-medium">{TITLES.FEATURE.REPORTS}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-center">
                  <CubeTransparentIcon className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-xs text-gray-600 font-medium">{TITLES.FEATURE.TRACKING}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
