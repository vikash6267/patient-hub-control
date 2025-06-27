import type React from "react";
import { useState, useEffect } from "react";
import { Phone, PhoneOff, Clock, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { ringCentralStore } from "@/ringcentral/store/ringcentral";

interface ConnectToRingCentralProps {
  showInDropdown?: boolean;
  showBadge?: boolean;
  showTooltip?: boolean;
  className?: string;
}

const ConnectToRingCentral: React.FC<ConnectToRingCentralProps> = ({
  showInDropdown = false,
  showBadge = true,
  showTooltip = true,
  className = "",
}) => {
  // RingCentral state
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tokenExpiry, setTokenExpiry] = useState("Not logged in");
  const [extInfo, setExtInfo] = useState(null);
  const [initComplete, setInitComplete] = useState(false);

  const isMobile = useIsMobile();

  useEffect(() => {
    const updateStatus = () => {
      setIsConnected(ringCentralStore.isConnected);
      setIsConnecting(ringCentralStore.isConnecting);
      setIsLoggedIn(ringCentralStore.isLoggedIn);
      setTokenExpiry(ringCentralStore.tokenExpiryFormatted);
      setExtInfo(ringCentralStore.extInfo);
      setInitComplete(ringCentralStore.initializationComplete);
    };

    updateStatus();
    const unsubscribe = ringCentralStore.subscribe(updateStatus);
    const interval = setInterval(updateStatus, 1000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const handleConnect = () => {
    ringCentralStore.connect();
  };

  const handleDisconnect = () => {
    ringCentralStore.disconnect();
  };

  const handleLogout = () => {
    ringCentralStore.logout();
  };

  // Show loading state during initialization
  if (!initComplete) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
        <span className="text-sm text-muted-foreground">
          Initializing RingCentral...
        </span>
      </div>
    );
  }

  // Render for dropdown menu
  if (showInDropdown) {
    return (
      <>
        {/* RingCentral Info */}
        {isLoggedIn && extInfo && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2 cursor-default">
              <Clock className="h-4 w-4" />
              <span className="text-xs">{tokenExpiry}</span>
            </DropdownMenuItem>
          </>
        )}

        {/* RingCentral Actions for Mobile */}
        {isMobile && (
          <>
            <DropdownMenuSeparator />
            {isLoggedIn ? (
              isConnected ? (
                <DropdownMenuItem
                  onClick={handleDisconnect}
                  className="flex items-center gap-2"
                >
                  <PhoneOff className="h-4 w-4" />
                  Disconnect Phone
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={handleConnect}
                  className="flex items-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  Connect Phone
                </DropdownMenuItem>
              )
            ) : (
              <DropdownMenuItem
                onClick={handleConnect}
                className="flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Login & Connect
              </DropdownMenuItem>
            )}
          </>
        )}
      </>
    );
  }

  // Render for header toolbar
  return (
    <TooltipProvider>
      <div className={`flex items-center gap-2 ${className}`}>
        {/* Connection Status Badge */}
        {showBadge && (
          <Badge
            variant={
              isConnected ? "default" : isLoggedIn ? "secondary" : "destructive"
            }
            className="hidden sm:flex items-center gap-1"
          >
            {isConnected ? (
              <Wifi className="h-3 w-3" />
            ) : (
              <WifiOff className="h-3 w-3" />
            )}
            {isConnected
              ? "Connected"
              : isLoggedIn
              ? "Logged In"
              : "Disconnected"}
          </Badge>
        )}

        {/* Connect/Disconnect Button */}
        {isLoggedIn ? (
          isConnected ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handleDisconnect}
              className="hidden sm:flex items-center gap-1 bg-transparent"
            >
              <PhoneOff className="h-4 w-4" />
              {!isMobile && "Disconnect"}
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={handleConnect}
              disabled={isConnecting}
              className="hidden sm:flex items-center gap-1"
            >
              <Phone className="h-4 w-4" />
              {isConnecting ? "Connecting..." : !isMobile && "Connect"}
            </Button>
          )
        ) : (
          <Button
            size="sm"
            onClick={handleConnect}
            disabled={isConnecting}
            className="hidden sm:flex items-center gap-1"
          >
            <Phone className="h-4 w-4" />
            {isConnecting ? "Connecting..." : !isMobile && "Login & Connect"}
          </Button>
        )}

        {/* Token Expiry Tooltip */}
        {isLoggedIn && !isMobile && showTooltip && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground"
              >
                <Clock className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Token {tokenExpiry}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
};

export default ConnectToRingCentral;
