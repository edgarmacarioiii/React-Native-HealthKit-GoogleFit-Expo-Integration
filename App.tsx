import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  SafeAreaView,
} from "react-native";
import AppleHealthKit, { HealthValue } from "react-native-health";
import GoogleFit, { Scopes } from "react-native-google-fit";
import React, { useEffect, useState } from "react";

export default function App() {
  const [displayedResult, setDisplayedResult] = useState<String>();
  useEffect(() => {
    if (Platform.OS === "android") {
      const options = {
        scopes: [Scopes.FITNESS_ACTIVITY_READ],
      };
      GoogleFit.isAvailable((isError, isAvailable) => {
        if (isAvailable) {
          GoogleFit.authorize(options)
            .then((authResult) => {
              if (authResult.success) {
                const opt = {
                  startDate: "2020-01-01T00:00:00.0Z",
                  endDate: new Date().toISOString(),
                };

                GoogleFit.getDailyStepCountSamples(opt)
                  .then((results) => {
                    setDisplayedResult(
                      `GetStep count results: ${JSON.stringify(
                        results,
                        undefined,
                        2
                      )}`
                    );
                  })
                  .catch((error) => {
                    setDisplayedResult(
                      `Get Daily Step count samples error: ${JSON.stringify(
                        error,
                        undefined,
                        2
                      )}`
                    );
                  });
              } else {
                setDisplayedResult(
                  `Authorize: DENIED |  ${authResult.message}`
                );
              }
            })
            .catch((error) => {
              setDisplayedResult(`Authorize: ERROR | ${error}`);
            });
        } else {
          setDisplayedResult("GoogleFit Unavailable");
        }
      });
    } else if (Platform.OS === "ios") {
      AppleHealthKit.isAvailable((error, available) => {
        if (available) {
          const permissions = {
            permissions: {
              read: [AppleHealthKit.Constants.Permissions.Steps],
              write: [],
            },
          };

          console.log("Initializing health kit");

          AppleHealthKit.initHealthKit(permissions, (error: string) => {
            /* Called after we receive a response from the system */
            if (error) {
              setDisplayedResult(`Init Error: ${error}`);
              return;
            }
            const options = {
              startDate: "2020-01-01T10:00:18.028+0800",
              endDate: new Date().toISOString(),
            };

            AppleHealthKit.getSamples(
              options,
              (callbackError: string, results: HealthValue[]) => {
                /* Samples are now collected from HealthKit */
                let result;
                if (error) {
                  result = `Get Step Count Error: ${JSON.stringify(
                    callbackError,
                    undefined,
                    2
                  )}`;
                } else {
                  result = `Get Step Count Results: ${JSON.stringify(
                    results,
                    undefined,
                    2
                  )}`;
                }
                setDisplayedResult(result);
              }
            );
          });
        } else {
          setDisplayedResult("HealthKit Unavailable");
        }
      });
    }
  }, []);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text
            style={styles.title}
          >{`Sample App for fetching Steps info from ${
            Platform.OS === "android" ? "Google Fit" : "Apple HealthKit"
          }`}</Text>
          <Text style={styles.subTitle}>Results:</Text>
          <Text>{displayedResult}</Text>
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
});
