// emails/NewArticleTemplate.jsx
// import { useEffect, useState } from "react";

import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Row,
  Section,
  Text,
} from "@react-email/components";

export default function BreakingNewsletter({
  getPosts,
  networkData,
  backendUrl,
  frontendUrl,
}: {
  getPosts: {
    title: { rendered: string };
    date: Date;
    rank_math_description: string;
    link: string;
    acf: { main_image: string; sub_title: string };
  }[];
  networkData: any;
  backendUrl: string;
  frontendUrl: string;
}) {
  if (getPosts.length) {
    const three = getPosts.slice(0, 4).map((item) => {
      return {
        //   image: "/placeholder.svg?height=200&width=400",
        image: item.acf.main_image,
        date: item.date,
        title: item.title.rendered,
        excerpt: item.rank_math_description
          ? item.rank_math_description
          : item.acf.sub_title,
        link: item.link.replace(backendUrl, frontendUrl),
      };
    });
    const publishDate = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const publishTime = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
    const NetworkOverview = networkData.networkOverview.data;

    const BlockReward = networkData.blockReward.data;
    const NetworkDiff = networkData.networkDiff.data;
    const BitcoinPrice = networkData.bitcoinPrice.data[0].closePrice;
    const NetworkHashrate = networkData.networkOverview.data.networkHashrate7d;

    return (
      <Html>
        <Head />
        <Body
          style={{ margin: 0, padding: 0, fontFamily: "Arial, sans-serif" }}>
          <Container
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              backgroundColor: "#ffffff",
              padding: "10px",
            }}>
            {/* Header */}
            <Section
              style={{
                backgroundColor: "#2563eb",
                borderRadius: "8px 8px 0 0",
              }}>
              <Row>
                <Column style={{ width: "70%", padding: "10px" }}>
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
                            backgroundColor: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}>
                          <Img
                            src={"https://theminermag.com/favicon.png"}
                            width={24}
                            height={24}
                            alt="Logo"
                          />
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
                    textAlign: "center",
                    verticalAlign: "start",
                  }}>
                  <Text
                    style={{ color: "#ffffff", fontSize: "14px", margin: 0 }}>
                    🔔 Breaking News
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* New Article Badge */}
            <Section
              style={{
                background: "linear-gradient(to right, #10b981, #3b82f6)",
                padding: "12px",
                textAlign: "center",
              }}>
              <div
                style={{
                  display: "inline-block",
                  backgroundColor: "#ffffff",
                  borderRadius: "20px",
                  padding: "4px 16px",
                  margin: "10px",
                }}>
                <Text
                  style={{
                    color: "#059669",
                    fontWeight: "bold",
                    fontSize: "14px",
                    margin: "0 8px 0 0",
                    display: "inline",
                  }}>
                  🚀 JUST PUBLISHED
                </Text>
                <Text
                  style={{
                    color: "#6b7280",
                    fontSize: "12px",
                    margin: 0,
                    display: "inline",
                  }}>
                  {publishDate}
                </Text>
              </div>
            </Section>

            {/* Main Article Content */}
            <Section
              style={{
                padding: "24px",
                border: "1px solid #e5e7eb",
                borderTop: "none",
              }}>
              {/* Article Title */}
              <Heading
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#111827",
                  width: "98%",
                  alignContent: "center",
                  margin: "0 auto 16px auto",
                  padding: "0 0 0 10px",
                  lineHeight: "1.3",
                }}>
                {three[0].title}
              </Heading>

              {/* Article Image */}
              <Section
                style={{
                  marginBottom: "16px",
                  margin: "auto",
                  textAlign: "center",
                }}>
                <Img
                  src={three[0].image}
                  width={"100%"}
                  height={"auto"}
                  alt="Article image"
                />
              </Section>

              {/* Article Excerpt */}
              <Section
                style={{
                  backgroundColor: "#eff6ff",
                  borderLeft: "4px solid #3b82f6",
                  padding: "16px",
                  marginBottom: "24px",
                  width: "95%",
                }}>
                <Heading
                  style={{
                    fontWeight: "bold",
                    color: "#1e3a8a",
                    marginBottom: "8px",
                    fontSize: "16px",
                    paddingLeft: "5px",
                  }}>
                  Article Excerpt
                </Heading>
                <Text
                  style={{
                    color: "#1e40af",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    paddingLeft: "5px",
                    margin: 0,
                  }}>
                  {three[0].rank_math_description}
                </Text>
              </Section>

              {/* Call to Action */}
              <Section style={{ textAlign: "center", marginBottom: "24px" }}>
                <Button
                  href={three[0].link}
                  style={{
                    backgroundColor: "#2563eb",
                    color: "#ffffff",
                    fontWeight: "bold",
                    padding: "12px 32px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    display: "inline-block",
                    border: "none",
                    fontSize: "16px",
                  }}>
                  Read Full Article →
                </Button>
              </Section>
            </Section>

            {/* Bitcoin Metrics */}
            <Section
              style={{
                padding: "16px",
                backgroundColor: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderTop: "none",
              }}>
              <Heading
                style={{
                  fontWeight: "bold",
                  color: "#111827",
                  marginBottom: "12px",
                  fontSize: "16px",
                }}>
                ₿ Bitcoin Network Stats
              </Heading>
              {/* Bitcoin Price */}
              <Row style={{ marginBottom: "12px" }}>
                <Column style={{ width: "40%", padding: "4px" }}>
                  <Text
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#111827",
                      margin: 0,
                    }}>
                    Bitcoin Price:
                  </Text>
                </Column>
                <Column style={{ width: "60%", padding: "4px" }}>
                  <Text
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: BitcoinPrice ? "#059669" : "#dc2626",
                      margin: 0,
                    }}>
                    {BitcoinPrice}
                  </Text>
                </Column>
              </Row>
              {/* Network Hashrate */}
              <Row style={{ marginBottom: "12px" }}>
                <Column style={{ width: "40%", padding: "4px" }}>
                  <Text
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#111827",
                      margin: 0,
                    }}>
                    Network Hashrate:
                  </Text>
                </Column>
                <Column style={{ width: "60%", padding: "4px" }}>
                  <Text
                    style={{
                      fontSize: "14px",
                      color: "#374151",
                      margin: 0,
                    }}>
                    {NetworkHashrate}
                  </Text>
                </Column>
              </Row>
              {/* Network Difficulty
              <Row style={{ marginBottom: "12px" }}>
                <Column style={{ width: "40%", padding: "4px" }}>
                  <Text
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#111827",
                      margin: 0,
                    }}>
                    Network Difficulty:
                  </Text>
                </Column>
                <Column style={{ width: "60%", padding: "4px" }}>
                  <Text
                    style={{
                      fontSize: "14px",
                      color: "#374151",
                      margin: 0,
                    }}>
                    diffi 04&
                  </Text>
                </Column>
              </Row> */}
            </Section>

            {/* Recent Articles */}
            <Section
              style={{
                padding: "16px",
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderTop: "none",
              }}>
              <Heading
                style={{
                  fontWeight: "bold",
                  color: "#111827",
                  marginBottom: "12px",
                  fontSize: "16px",
                }}>
                📚 Recent Articles
              </Heading>
              {three.slice(1).map((article, index) => (
                <Link href={article.link}>
                  <Section
                    key={index}
                    style={{
                      backgroundColor: "#ffffff",
                      padding: "12px",
                      width: "95%",
                      borderRadius: "4px",
                      border: "0.5px solid #e5e7eb",
                      marginBottom: "12px",
                    }}>
                    <Row>
                      <Column style={{ width: "30%" }}>
                        <Img
                          src={article.image}
                          width={"100%"}
                          height={"auto"}
                          alt={`Image for ${article.title}`}
                          style={{ borderRadius: "4px" }}
                        />
                      </Column>
                      <Column style={{ width: "70%", padding: "0 0 0 12px" }}>
                        <Heading
                          style={{
                            fontWeight: "bold",
                            fontSize: "14px",
                            color: "#111827",
                            margin: "0 0 4px 0",
                          }}>
                          {article.title}
                        </Heading>
                        <Text
                          style={{
                            fontSize: "12px",
                            color: "#6b7280",
                            margin: "0 0 4px 0",
                          }}>
                          {article.date}
                        </Text>
                      </Column>
                    </Row>
                  </Section>
                </Link>
              ))}
            </Section>

            {/* Footer */}
            <Section
              style={{
                backgroundColor: "#f3f4f6",
                padding: "16px",
                border: "1px solid #e5e7eb",
                borderRadius: "0 0 8px 8px",
                textAlign: "center",
              }}>
              <Text
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  marginBottom: "12px",
                }}>
                Your trusted source for cryptocurrency mining news and analysis
              </Text>
              <Text
                style={{
                  marginBottom: "8px",
                  fontSize: "12px",
                  color: "#6b7280",
                }}>
                © 2025 TheMinerMag. All rights reserved.
              </Text>

              <Row>
                <Column style={{ width: "50%", textAlign: "center" }}>
                  <Link
                    href="https://theminermag.com/newsletter/login"
                    style={{
                      color: "#2563eb",
                      fontSize: "12px",
                      textDecoration: "underline",
                    }}>
                    Unsubscribe
                  </Link>
                </Column>
                <Column style={{ width: "50%", textAlign: "center" }}>
                  <Link
                    href="https://theminermag.com/privacy-policy"
                    style={{
                      color: "#2563eb",
                      fontSize: "12px",
                      textDecoration: "underline",
                    }}>
                    Privacy Policy
                  </Link>
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  }
}
