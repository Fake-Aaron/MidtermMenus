import { Redirect } from "expo-router";
import React from "react";

export default function RootRedirect() {
  // Redirect root (/) to /menu for web/dev server
  return <Redirect href="/menu" />;
}