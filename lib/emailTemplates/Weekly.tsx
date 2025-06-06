"use client";
// emails/WeeklyNewsletterTemplate.jsx
import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Row,
  Column,
  Heading,
  Text,
  Link,
  Hr,
} from "@react-email/components";

export default function WeeklyNewsletterTemplate() {
  // Get current week number and date range
  const currentDate = new Date();
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const weekRange = `${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`;

  return (
    <Html>
      <Head />
      <Body style={{ margin: 0, padding: 0, fontFamily: "Arial, sans-serif" }}>
        <Container
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            padding: "24px",
          }}>
          {/* Header */}
          <Section
            style={{
              backgroundColor: "#2563eb",
              padding: "16px",
              borderRadius: "8px 8px 0 0",
            }}>
            <Row>
              <Column style={{ width: "70%" }}>
                <Row>
                  <Column style={{ width: "40px", verticalAlign: "middle" }}>
                    <div
                      style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "4px",
                        padding: "4px",
                        display: "inline-block",
                      }}>
                      <div
                        style={{
                          height: "24px",
                          width: "24px",
                          backgroundColor: "#2563eb",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                        <Text
                          style={{
                            color: "#ffffff",
                            fontWeight: "bold",
                            fontSize: "14px",
                            margin: 0,
                          }}>
                          M
                        </Text>
                      </div>
                    </div>
                  </Column>
                  <Column style={{ verticalAlign: "middle" }}>
                    <Heading
                      style={{
                        color: "#ffffff",
                        fontSize: "20px",
                        fontWeight: "bold",
                        margin: "0 0 0 8px",
                      }}>
                      TheMinerMag
                    </Heading>
                  </Column>
                </Row>
              </Column>
              <Column
                style={{
                  width: "30%",
                  textAlign: "right",
                  verticalAlign: "middle",
                }}>
                <Text style={{ color: "#ffffff", fontSize: "14px", margin: 0 }}>
                  📅 Weekly Update: {weekRange}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Introduction */}
          <Section
            style={{
              border: "1px solid #e5e7eb",
              borderTop: "none",
              backgroundColor: "#f9fafb",
              padding: "16px",
            }}>
            <Heading
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "8px",
                color: "#111827",
              }}>
              This Week in Crypto Mining
            </Heading>
            <Text
              style={{
                fontSize: "14px",
                color: "#6b7280",
                margin: 0,
                lineHeight: "1.5",
              }}>
              Your weekly digest of breaking news, market movements, and
              essential updates from the world of cryptocurrency mining.
            </Text>
          </Section>

          {/* Breaking News */}
          <Section
            style={{
              border: "1px solid #e5e7eb",
              borderTop: "none",
              padding: "16px",
            }}>
            <div
              style={{
                display: "inline-block",
                backgroundColor: "#fef2f2",
                color: "#991b1b",
                fontSize: "12px",
                fontWeight: "500",
                padding: "2px 8px",
                borderRadius: "4px",
                marginBottom: "8px",
              }}>
              BREAKING
            </div>
            <Heading
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "8px",
                color: "#111827",
              }}>
              Cango Set to Add 18 EH/s Bitcoin Hashrate by July
            </Heading>
            <Text
              style={{
                fontSize: "14px",
                color: "#6b7280",
                marginBottom: "12px",
                lineHeight: "1.5",
              }}>
              In a major development this week, Cango has approved a $352M sale
              to fund a significant hashrate expansion, implying Bitmain's
              energy rate of $0.0758/kWh.
            </Text>
            <Link
              href="#"
              style={{
                color: "#2563eb",
                fontSize: "14px",
                fontWeight: "500",
                textDecoration: "none",
              }}>
              Read More →
            </Link>
          </Section>

          {/* This Week's Stories */}
          <Section
            style={{
              border: "1px solid #e5e7eb",
              borderTop: "none",
              backgroundColor: "#f9fafb",
              padding: "16px",
            }}>
            <Heading
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "12px",
                color: "#111827",
              }}>
              📰 This Week's Top Stories
            </Heading>

            {/* Story 1 */}
            <Section
              style={{
                marginBottom: "16px",
                paddingBottom: "12px",
                borderBottom: "1px solid #e5e7eb",
              }}>
              <Row>
                <Column style={{ width: "80px", verticalAlign: "top" }}>
                  <Text
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      margin: "4px 0 0 0",
                      whiteSpace: "nowrap",
                    }}>
                    May 15
                  </Text>
                </Column>
                <Column style={{ verticalAlign: "top" }}>
                  <Heading
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      marginBottom: "4px",
                      color: "#111827",
                    }}>
                    ASIC Titan Bows to Cooling Demand in Bull Market
                  </Heading>
                  <Text
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      marginBottom: "4px",
                      lineHeight: "1.4",
                    }}>
                    No more steep premiums for digital gold shovels.
                  </Text>
                  <Link
                    href="#"
                    style={{
                      color: "#2563eb",
                      fontSize: "12px",
                      fontWeight: "500",
                      textDecoration: "none",
                    }}>
                    Read More
                  </Link>
                </Column>
              </Row>
            </Section>

            {/* Story 2 */}
            <Section
              style={{
                marginBottom: "16px",
                paddingBottom: "12px",
                borderBottom: "1px solid #e5e7eb",
              }}>
              <Row>
                <Column style={{ width: "80px", verticalAlign: "top" }}>
                  <Text
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      margin: "4px 0 0 0",
                      whiteSpace: "nowrap",
                    }}>
                    May 14
                  </Text>
                </Column>
                <Column style={{ verticalAlign: "top" }}>
                  <Heading
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      marginBottom: "4px",
                      color: "#111827",
                    }}>
                    HIVE Targets 16 EH/s with Bitcoin-Backed Purchases
                  </Heading>
                  <Text
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      marginBottom: "4px",
                      lineHeight: "1.4",
                    }}>
                    Company also upsized an ATM program to tap equity markets.
                  </Text>
                  <Link
                    href="#"
                    style={{
                      color: "#2563eb",
                      fontSize: "12px",
                      fontWeight: "500",
                      textDecoration: "none",
                    }}>
                    Read More
                  </Link>
                </Column>
              </Row>
            </Section>

            {/* Story 3 */}
            <Section>
              <Row>
                <Column style={{ width: "80px", verticalAlign: "top" }}>
                  <Text
                    style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      margin: "4px 0 0 0",
                      whiteSpace: "nowrap",
                    }}>
                    May 13
                  </Text>
                </Column>
                <Column style={{ verticalAlign: "top" }}>
                  <Heading
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      marginBottom: "4px",
                      color: "#111827",
                    }}>
                    Bitfarms Halts Mining in Argentina Amid Power Issues
                  </Heading>
                  <Text
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      marginBottom: "4px",
                      lineHeight: "1.4",
                    }}>
                    Operations made up 10% of Bitfarms' Q1 revenue.
                  </Text>
                  <Link
                    href="#"
                    style={{
                      color: "#2563eb",
                      fontSize: "12px",
                      fontWeight: "500",
                      textDecoration: "none",
                    }}>
                    Read More
                  </Link>
                </Column>
              </Row>
            </Section>
          </Section>

          {/* Market Movements */}
          <Section
            style={{
              border: "1px solid #e5e7eb",
              borderTop: "none",
              padding: "16px",
            }}>
            <Heading
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "12px",
                color: "#111827",
              }}>
              📈 Weekly Market Movements
            </Heading>

            <Row style={{ marginBottom: "16px" }}>
              <Column style={{ width: "50%", paddingRight: "8px" }}>
                <Section
                  style={{
                    backgroundColor: "#f9fafb",
                    padding: "12px",
                    borderRadius: "8px",
                  }}>
                  <Text
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#6b7280",
                      marginBottom: "4px",
                    }}>
                    Bitcoin
                  </Text>
                  <Text
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#111827",
                      marginBottom: "2px",
                    }}>
                    $65,432.00
                  </Text>
                  <Text
                    style={{ fontSize: "12px", color: "#059669", margin: 0 }}>
                    +3.2% this week
                  </Text>
                </Section>
              </Column>
              <Column style={{ width: "50%", paddingLeft: "8px" }}>
                <Section
                  style={{
                    backgroundColor: "#f9fafb",
                    padding: "12px",
                    borderRadius: "8px",
                  }}>
                  <Text
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#6b7280",
                      marginBottom: "4px",
                    }}>
                    Hashrate
                  </Text>
                  <Text
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#111827",
                      marginBottom: "2px",
                    }}>
                    512.3 EH/s
                  </Text>
                  <Text
                    style={{ fontSize: "12px", color: "#059669", margin: 0 }}>
                    +1.7% this week
                  </Text>
                </Section>
              </Column>
            </Row>

            <Section
              style={{
                backgroundColor: "#eff6ff",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #dbeafe",
              }}>
              <Heading
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#1e40af",
                  marginBottom: "4px",
                }}>
                Mining Profitability Index
              </Heading>
              <Row>
                <Column style={{ width: "60%" }}>
                  <Text
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#111827",
                      margin: 0,
                    }}>
                    0.00021 BTC/TH/day
                  </Text>
                </Column>
                <Column style={{ width: "40%", textAlign: "right" }}>
                  <Text
                    style={{ fontSize: "14px", color: "#1d4ed8", margin: 0 }}>
                    <span style={{ fontWeight: "500" }}>Weekly change:</span>{" "}
                    +2.3%
                  </Text>
                </Column>
              </Row>
            </Section>
          </Section>

          {/* Quick Links */}
          <Section
            style={{
              border: "1px solid #e5e7eb",
              borderTop: "none",
              backgroundColor: "#f9fafb",
              padding: "16px",
            }}>
            <Heading
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: "12px",
                color: "#111827",
              }}>
              Quick Links
            </Heading>
            <Row>
              <Column style={{ width: "50%" }}>
                <Link
                  href="#"
                  style={{
                    color: "#2563eb",
                    fontSize: "14px",
                    textDecoration: "underline",
                    display: "block",
                    marginBottom: "4px",
                  }}>
                  Market Data
                </Link>
                <Link
                  href="#"
                  style={{
                    color: "#2563eb",
                    fontSize: "14px",
                    textDecoration: "underline",
                    display: "block",
                  }}>
                  Latest Research
                </Link>
              </Column>
              <Column style={{ width: "50%" }}>
                <Link
                  href="#"
                  style={{
                    color: "#2563eb",
                    fontSize: "14px",
                    textDecoration: "underline",
                    display: "block",
                    marginBottom: "4px",
                  }}>
                  Mining Calculator
                </Link>
                <Link
                  href="#"
                  style={{
                    color: "#2563eb",
                    fontSize: "14px",
                    textDecoration: "underline",
                    display: "block",
                  }}>
                  Company Profiles
                </Link>
              </Column>
            </Row>
          </Section>

          {/* Footer */}
          <Section
            style={{
              backgroundColor: "#f3f4f6",
              padding: "16px",
              border: "1px solid #e5e7eb",
              borderTop: "none",
              borderRadius: "0 0 8px 8px",
              textAlign: "center",
            }}>
            <Text
              style={{
                marginBottom: "8px",
                fontSize: "14px",
                color: "#6b7280",
              }}>
              © 2025 TheMinerMag. All rights reserved.
            </Text>
            <Row>
              <Column style={{ width: "33.33%", textAlign: "center" }}>
                <Link
                  href="#"
                  style={{
                    color: "#2563eb",
                    fontSize: "14px",
                    textDecoration: "underline",
                  }}>
                  Unsubscribe
                </Link>
              </Column>
              <Column style={{ width: "33.33%", textAlign: "center" }}>
                <Link
                  href="#"
                  style={{
                    color: "#2563eb",
                    fontSize: "14px",
                    textDecoration: "underline",
                  }}>
                  Preferences
                </Link>
              </Column>
              <Column style={{ width: "33.33%", textAlign: "center" }}>
                <Link
                  href="#"
                  style={{
                    color: "#2563eb",
                    fontSize: "14px",
                    textDecoration: "underline",
                  }}>
                  View in Browser
                </Link>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
