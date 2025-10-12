import React, { useState, useEffect } from "react";
import {
  SecurityMonitor,
  HTTPSManager,
  InputValidator,
} from "@utils/securityAudit";
import {
  ShieldCheckIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import NavigationButton from "@components/buttons/NavigationButton";

const SecurityAuditDashboard = () => {
  const [securityReport, setSecurityReport] = useState(null);
  const [securityStatus, setSecurityStatus] = useState(null);
  const [testInput, setTestInput] = useState("");
  const [validationResult, setValidationResult] = useState(null);

  useEffect(() => {
    // Get initial security status
    const status = HTTPSManager.getSecurityStatus();
    const report = SecurityMonitor.getSecurityReport();

    setSecurityStatus(status);
    setSecurityReport(report);
  }, []);

  const handleInputValidation = () => {
    const result = InputValidator.validateTextInput(testInput);
    setValidationResult(result);

    // Log security event if input is suspicious
    if (!result.valid) {
      SecurityMonitor.logSecurityEvent({
        type: "input_validation_failed",
        severity: "low",
        message: "Input validation failed",
        details: { input: testInput.substring(0, 50) + "..." },
      });
    }
  };

  const refreshSecurityReport = () => {
    const report = SecurityMonitor.getSecurityReport();
    const status = HTTPSManager.getSecurityStatus();
    setSecurityReport(report);
    setSecurityStatus(status);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "text-red-400 bg-red-500/20 border-red-500/30";
      case "medium":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30";
      case "low":
        return "text-blue-400 bg-blue-500/20 border-blue-500/30";
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/30";
    }
  };

  const getStatusColor = (status) => {
    return status
      ? "text-emerald-400 bg-emerald-500/20 border-emerald-500/30"
      : "text-red-400 bg-red-500/20 border-red-500/30";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-8">
          <NavigationButton
            to="/"
            className="inline-flex items-center gap-2 cursor-pointer"
          >
            <ShieldCheckIcon className="h-5 w-5" />
            <span>Back to Home</span>
          </NavigationButton>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden border border-slate-700/50">
          <div className="px-6 py-8 sm:px-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  Security Audit Dashboard
                </h1>
                <p className="text-slate-400 text-sm">
                  Monitor security status and events in real-time
                </p>
              </div>
              <button
                onClick={refreshSecurityReport}
                className="group px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-indigo-500/50 flex items-center gap-2 cursor-pointer"
              >
                <ArrowPathIcon className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
                <span>Refresh Report</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-700/30 backdrop-blur-sm p-6 rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  {securityStatus?.https ? (
                    <CheckCircleIcon className="h-5 w-5 text-emerald-400" />
                  ) : (
                    <XCircleIcon className="h-5 w-5 text-red-400" />
                  )}
                  HTTPS Status
                </h3>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                    securityStatus?.https
                  )}`}
                >
                  {securityStatus?.https ? "Secure" : "Insecure"}
                </span>
              </div>

              <div className="bg-slate-700/30 backdrop-blur-sm p-6 rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  {securityStatus?.csp ? (
                    <CheckCircleIcon className="h-5 w-5 text-emerald-400" />
                  ) : (
                    <XCircleIcon className="h-5 w-5 text-red-400" />
                  )}
                  CSP Status
                </h3>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                    securityStatus?.csp
                  )}`}
                >
                  {securityStatus?.csp ? "Configured" : "Missing"}
                </span>
              </div>

              <div className="bg-slate-700/30 backdrop-blur-sm p-6 rounded-xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  {Object.keys(securityStatus?.securityHeaders || {}).length >
                  0 ? (
                    <CheckCircleIcon className="h-5 w-5 text-emerald-400" />
                  ) : (
                    <XCircleIcon className="h-5 w-5 text-red-400" />
                  )}
                  Security Headers
                </h3>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                    Object.keys(securityStatus?.securityHeaders || {}).length >
                      0
                  )}`}
                >
                  {Object.keys(securityStatus?.securityHeaders || {}).length}{" "}
                  Headers
                </span>
              </div>
            </div>
            <div className="bg-slate-700/30 backdrop-blur-sm p-6 rounded-xl border border-slate-600/30 mb-8">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <ShieldCheckIcon className="h-5 w-5 text-indigo-400" />
                Input Validation Test
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <input
                  type="text"
                  value={testInput}
                  onChange={(e) => setTestInput(e.target.value)}
                  placeholder="Enter text to validate..."
                  className="flex-1 px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                />
                <button
                  onClick={handleInputValidation}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-indigo-500/50 font-medium cursor-pointer"
                >
                  Validate
                </button>
              </div>

              {validationResult && (
                <div
                  className={`p-4 rounded-lg border ${
                    validationResult.valid
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                      : "bg-red-500/20 text-red-400 border-red-500/30"
                  }`}
                >
                  <p className="font-medium flex items-center gap-2">
                    {validationResult.valid ? (
                      <>
                        <CheckCircleIcon className="h-5 w-5" />
                        Valid input
                      </>
                    ) : (
                      <>
                        <XCircleIcon className="h-5 w-5" />
                        Invalid input
                      </>
                    )}
                  </p>
                  {!validationResult.valid && (
                    <p className="text-sm mt-2 opacity-80">
                      {validationResult.error}
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="bg-slate-700/30 backdrop-blur-sm p-6 rounded-xl border border-slate-600/30 mb-8">
              <h3 className="text-lg font-semibold text-white mb-6">
                Security Events
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-slate-600/30">
                  <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    {securityReport?.totalEvents || 0}
                  </div>
                  <div className="text-sm text-slate-400 mt-1">
                    Total Events
                  </div>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-red-500/30">
                  <div className="text-3xl font-bold text-red-400">
                    {securityReport?.eventsBySeverity?.high || 0}
                  </div>
                  <div className="text-sm text-slate-400 mt-1">
                    High Severity
                  </div>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-yellow-500/30">
                  <div className="text-3xl font-bold text-yellow-400">
                    {securityReport?.eventsBySeverity?.medium || 0}
                  </div>
                  <div className="text-sm text-slate-400 mt-1">
                    Medium Severity
                  </div>
                </div>
              </div>
              {securityReport?.recentEvents?.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium text-white">Recent Events:</h4>
                  {securityReport.recentEvents
                    .slice(0, 5)
                    .map((event, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-slate-800/50 rounded-lg border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(
                                event.severity
                              )}`}
                            >
                              {event.severity}
                            </span>
                            <span className="font-medium text-white">
                              {event.type}
                            </span>
                          </div>
                          <p className="text-sm text-slate-400 mt-2">
                            {event.message}
                          </p>
                        </div>
                        <span className="text-xs text-slate-500">
                          {new Date(event.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </div>
            <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm p-6 rounded-xl border border-indigo-500/30">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <ShieldCheckIcon className="h-5 w-5 text-indigo-400" />
                Security Recommendations
              </h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-all duration-300">
                  <span className="text-indigo-400 mt-1 text-xl">•</span>
                  <span>Regular security audits and dependency updates</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-all duration-300">
                  <span className="text-indigo-400 mt-1 text-xl">•</span>
                  <span>Monitor for unusual activity patterns</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-all duration-300">
                  <span className="text-indigo-400 mt-1 text-xl">•</span>
                  <span>Keep Content Security Policy updated</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-all duration-300">
                  <span className="text-indigo-400 mt-1 text-xl">•</span>
                  <span>Regular backup of security logs</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-all duration-300">
                  <span className="text-indigo-400 mt-1 text-xl">•</span>
                  <span>User education on security best practices</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityAuditDashboard;
