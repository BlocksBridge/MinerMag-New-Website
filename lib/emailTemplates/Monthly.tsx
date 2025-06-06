"use client";
// emails/MonthlyNewsletterTemplate.jsx
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

export default function MonthlyNewsletterTemplate() {
  const currentDate = new Date();
  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

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
                  📅 Monthly Digest: {monthName} {year}
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
              This Month in Crypto Mining
            </Heading>
            <Text
              style={{
                fontSize: "14px",
                color: "#6b7280",
                margin: 0,
                lineHeight: "1.5",
              }}>
              Your monthly roundup of the most important developments in
              cryptocurrency mining, market trends, and industry insights.
            </Text>
          </Section>

          {/* Featured Story */}
          <Section
            style={{
              border: "1px solid #e5e7eb",
              borderTop: "none",
              padding: "16px",
            }}>
            <Text
              style={{
                fontSize: "14px",
                color: "#6b7280",
                marginBottom: "4px",
              }}>
              May 19, 2025
            </Text>
            <Heading
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "8px",
                color: "#111827",
                lineHeight: "1.3",
              }}>
              Cango Set to Add 18 EH/s Bitcoin Hashrate by July, Approves $352M
              Sale
            </Heading>

            {/* Featured Image Placeholder */}
            <Section
              style={{
                height: "200px",
                width: "100%",
                marginBottom: "12px",
                borderRadius: "8px",
                backgroundColor: "#f3f4f6",
                border: "1px solid #e5e7eb",
                textAlign: "center",
                padding: "60px 0",
              }}>
              <Text style={{ fontSize: "48px", margin: "0 0 8px 0" }}>⛏️</Text>
              <Text
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#6b7280",
                  margin: 0,
                }}>
                Bitcoin Mining Operation
              </Text>
            </Section>

            <Text
              style={{
                fontSize: "14px",
                color: "#6b7280",
                marginBottom: "12px",
                lineHeight: "1.5",
              }}>
              Q1 fleet hashcost implies Bitmain's energy rate of $0.0758/kWh.
              The expansion represents one of the largest single deployments
              this year and will significantly impact the global hashrate.
            </Text>
            <Link
              href="#"
              style={{
                color: "#2563eb",
                fontSize: "14px",
                fontWeight: "500",
                textDecoration: "none",
              }}>
              Read Full Story →
            </Link>
          </Section>

          {/* Top Stories */}
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
                marginBottom: "16px",
                color: "#111827",
              }}>
              📰 Top Stories This Month
            </Heading>

            {/* Story 1 */}
            <Section
              style={{
                marginBottom: "16px",
                paddingBottom: "16px",
                borderBottom: "1px solid #e5e7eb",
              }}>
              <Text
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  marginBottom: "4px",
                }}>
                May 15, 2025
              </Text>
              <Heading
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                  color: "#111827",
                }}>
                Miner Weekly: ASIC Titan Bows to Cooling Demand in Bull Market
                Twist
              </Heading>
              <Text
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  marginBottom: "8px",
                  lineHeight: "1.4",
                }}>
                No more steep premiums for digital gold shovels as cooling
                technology becomes the limiting factor.
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
            </Section>

            {/* Story 2 */}
            <Section
              style={{
                marginBottom: "16px",
                paddingBottom: "16px",
                borderBottom: "1px solid #e5e7eb",
              }}>
              <Text
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  marginBottom: "4px",
                }}>
                May 15, 2025
              </Text>
              <Heading
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                  color: "#111827",
                }}>
                HIVE Targets 16 EH/s with Bitcoin-Backed Miner Purchases
              </Heading>
              <Text
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  marginBottom: "8px",
                  lineHeight: "1.4",
                }}>
                HIVE also upsized an ATM program to tap equity markets for
                expansion capital.
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
            </Section>

            {/* Story 3 */}
            <Section>
              <Text
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  marginBottom: "4px",
                }}>
                May 15, 2025
              </Text>
              <Heading
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                  color: "#111827",
                }}>
                Bitfarms Halts Bitcoin Mining in Argentina Amid Power Supply
                Suspension
              </Heading>
              <Text
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  marginBottom: "8px",
                  lineHeight: "1.4",
                }}>
                Argentina operations made up 10% of Bitfarms' revenue in Q1,
                creating significant headwinds.
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
            </Section>
          </Section>

          {/* Market Data */}
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
                marginBottom: "16px",
                color: "#111827",
              }}>
              📊 Market Snapshot
            </Heading>

            <Row style={{ marginBottom: "12px" }}>
              <Column style={{ width: "50%", paddingRight: "8px" }}>
                <Section
                  style={{
                    backgroundColor: "#f9fafb",
                    padding: "12px",
                    borderRadius: "8px",
                    marginBottom: "8px",
                  }}>
                  <Text
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#6b7280",
                      marginBottom: "4px",
                    }}>
                    Bitcoin Price
                  </Text>
                  <Text
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#111827",
                      marginBottom: "2px",
                    }}>
                    $65,432.00
                  </Text>
                  <Text
                    style={{ fontSize: "12px", color: "#059669", margin: 0 }}>
                    +2.4% this month
                  </Text>
                </Section>
              </Column>
              <Column style={{ width: "50%", paddingLeft: "8px" }}>
                <Section
                  style={{
                    backgroundColor: "#f9fafb",
                    padding: "12px",
                    borderRadius: "8px",
                    marginBottom: "8px",
                  }}>
                  <Text
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#6b7280",
                      marginBottom: "4px",
                    }}>
                    Network Hashrate
                  </Text>
                  <Text
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#111827",
                      marginBottom: "2px",
                    }}>
                    512.3 EH/s
                  </Text>
                  <Text
                    style={{ fontSize: "12px", color: "#059669", margin: 0 }}>
                    +5.7% this month
                  </Text>
                </Section>
              </Column>
            </Row>

            <Row>
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
                    Mining Difficulty
                  </Text>
                  <Text
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#111827",
                      marginBottom: "2px",
                    }}>
                    78.2T
                  </Text>
                  <Text
                    style={{ fontSize: "12px", color: "#dc2626", margin: 0 }}>
                    -1.2% this month
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
                    Avg. Transaction Fee
                  </Text>
                  <Text
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#111827",
                      marginBottom: "2px",
                    }}>
                    $12.45
                  </Text>
                  <Text
                    style={{ fontSize: "12px", color: "#059669", margin: 0 }}>
                    +18.3% this month
                  </Text>
                </Section>
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
              © {year} TheMinerMag. All rights reserved.
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
