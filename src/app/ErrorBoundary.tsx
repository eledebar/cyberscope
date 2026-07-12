import { Component, type ErrorInfo, type ReactNode } from "react";

export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error("CyberScope rendering error", error, info); }
  render() { return this.state.failed ? <main className="grid min-h-screen place-items-center bg-slate-50 p-6 dark:bg-[#0d110f]"><div className="panel max-w-lg p-8"><p className="eyebrow">CYBERSCOPE / SAFE MODE</p><h1 className="page-title">The interface could not be rendered</h1><p className="lead">Reload the application. Your preferences and saved topics remain on this device.</p><button className="button-primary mt-6" onClick={() => location.reload()}>Reload</button></div></main> : this.props.children; }
}
