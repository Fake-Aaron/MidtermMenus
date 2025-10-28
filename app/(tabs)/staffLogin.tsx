import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { signIn } from "../../lib/auth";
import { supabase } from "../../lib/supabase";

const JASPER_ORANGE = "#D35400";

export default function StaffLoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });
  }, []);

  async function handleLogin() {
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);

    if (error) {
      Alert.alert("Login failed", error.message);
    } else {
      setIsLoggedIn(true);
      Alert.alert("Success", "You’re logged in!");
      router.push("/staffPanel"); // Navigate to your CRUD page
    }
  }

  async function handleLogout() {
    try {
      await supabase.auth.signOut();
      setIsLoggedIn(false);
      setEmail("");
      setPassword("");
    } catch (error) {
      Alert.alert("Error", "Failed to log out");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Staff Login</Text>
        {isLoggedIn && (
          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        )}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Logging in..." : "Login"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    position: "relative",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: JASPER_ORANGE,
  },
  logoutBtn: {
    position: "absolute",
    right: 0,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#fff",
  },
  logoutText: {
    color: "#000",
    fontWeight: "700",
  },
  input: {
    borderWidth: 2,
    borderColor: JASPER_ORANGE, // orange input border to match menu
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
    color: "#111",
  },
  button: {
    backgroundColor: JASPER_ORANGE, // jasper orange button
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000", // subtle black outline like separators
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
