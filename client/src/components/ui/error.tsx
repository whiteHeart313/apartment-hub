import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "./button";
import { Alert, AlertDescription } from "./alert";
import { cn } from "../../lib/utils";

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export function ErrorMessage({ message, className }: ErrorMessageProps) {
  return (
    <Alert variant="destructive" className={className}>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}

interface ErrorPageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export function ErrorPage({
  title = "Something went wrong",
  message,
  onRetry,
  retryLabel = "Try again",
  className,
}: ErrorPageProps) {
  return (
    <div
      className={cn(
        "min-h-screen bg-gray-50 flex items-center justify-center",
        className,
      )}
    >
      <div className="max-w-md mx-auto text-center px-4">
        <div className="mb-8">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600 mb-8">{message}</p>
        </div>

        {onRetry && (
          <Button onClick={onRetry} className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            {retryLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

interface ErrorCardProps {
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export function ErrorCard({
  message,
  onRetry,
  retryLabel = "Retry",
  className,
}: ErrorCardProps) {
  return (
    <div
      className={cn(
        "border border-red-200 rounded-lg p-6 bg-red-50",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-red-800 mb-3">{message}</p>
          {onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="border-red-300 text-red-700 hover:bg-red-100"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {retryLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

interface ErrorBoundaryFallbackProps {
  error: Error;
  resetError: () => void;
}

export function ErrorBoundaryFallback({
  error,
  resetError,
}: ErrorBoundaryFallbackProps) {
  return (
    <ErrorPage
      title="Application Error"
      message={error.message || "An unexpected error occurred"}
      onRetry={resetError}
      retryLabel="Reload page"
    />
  );
}
