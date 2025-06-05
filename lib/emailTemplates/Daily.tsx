// emails/NewArticleTemplate.jsx
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
  Img,
  Button,
  Hr,
} from "@react-email/components";
import { useEffect, useState } from "react";
export default function NewArticleTemplate() {
  const currentDate = new Date();
  const publishDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const publishTime = currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  const [article, setArticle] = useState("");

  useEffect(() => {
    (async () => {
      const getPosts: [any] = await fetch(
        `${
          process.env.NEXT_PUBLIC_backend_url
        }/wp-json/wp/v2/posts?acf_format=standard&_=${Date.now()}`,
        { next: { revalidate: 3600 } }
      ).then((res) => res.json());
      const three = getPosts.slice(0, 4).map((item) => {
        return {
          //   image: "/placeholder.svg?height=200&width=400",
          image: item.acf.main_image,
          date: item.date,
          title: item.title.rendered,
          excerpt: item.acf.sub_title,
          link: item.link,
        };
      });
      setArticle(three);
    })();
    return () => {};
  }, []);
  if (article.length) {
    console.log(article);
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
                            // borderRadius: "50%",

                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}>
                          <Img src={"/favicon.png"} width={24} height={24} />
                          {/* <Text
                          style={{
                            color: "#ffffff",
                            fontWeight: "bold",
                            fontSize: "14px",
                            margin: 0,
                          }}>
                          M
                        </Text> */}
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
                    🔔 New Article
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
                  {publishTime}
                </Text>
              </div>
            </Section>

            {/* Article Content */}
            <Section
              style={{
                padding: "24px",

                border: "1px solid #e5e7eb",
                borderTop: "none",
              }}>
              {/* Publication Info */}
              <Row
                style={{
                  marginBottom: "16px",

                  width: "95%",
                }}>
                <Column style={{ width: "50%" }}>
                  <Text
                    style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
                    📅 {publishDate}
                  </Text>
                </Column>
                <Column style={{ width: "50%", textAlign: "right" }}>
                  <Text
                    style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
                    ⏱️ 5 min read
                  </Text>
                </Column>
              </Row>

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
                {article[0].title}
              </Heading>

              {/* Article Image Placeholder */}
              <Section
                style={{
                  height: "200px",
                  width: "100%",
                  marginBottom: "16px",
                  borderRadius: "8px",
                  backgroundColor: "#f3f4f6",
                  border: "1px solid #e5e7eb",
                  textAlign: "center",
                  padding: "60px 0",
                }}>
                <Img src={article[0].image} />
              </Section>

              {/* Article Summary */}
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
                  {article[0].excerpt}
                </Text>
              </Section>

              {/* Key Points */}
              <Section style={{ marginBottom: "24px" }}>
                <Heading
                  style={{
                    fontWeight: "bold",
                    color: "#111827",
                    marginBottom: "12px",
                    fontSize: "16px",
                  }}>
                  💡 Key Highlights
                </Heading>

                <Text
                  style={{
                    fontSize: "14px",
                    color: "#374151",
                    margin: "8px 0",
                    lineHeight: "1.5",
                  }}>
                  ✓ $352M sale approved to fund massive hashrate expansion
                </Text>
                <Text
                  style={{
                    fontSize: "14px",
                    color: "#374151",
                    margin: "8px 0",
                    lineHeight: "1.5",
                  }}>
                  ✓ 18 EH/s addition planned for July deployment
                </Text>
                <Text
                  style={{
                    fontSize: "14px",
                    color: "#374151",
                    margin: "8px 0",
                    lineHeight: "1.5",
                  }}>
                  ✓ Energy rate of $0.0758/kWh indicates competitive positioning
                </Text>
                <Text
                  style={{
                    fontSize: "14px",
                    color: "#374151",
                    margin: "8px 0",
                    lineHeight: "1.5",
                  }}>
                  ✓ Significant impact expected on global Bitcoin network
                  hashrate
                </Text>
              </Section>

              {/* Market Impact */}
              <Section
                style={{
                  backgroundColor: "#f9fafb",
                  padding: "16px",
                  borderRadius: "8px",
                  marginBottom: "24px",
                }}>
                <Heading
                  style={{
                    fontWeight: "bold",
                    color: "#111827",
                    marginBottom: "12px",
                    fontSize: "16px",
                  }}>
                  📈 Market Impact
                </Heading>
                <Row>
                  <Column style={{ width: "50%", textAlign: "center" }}>
                    <Text
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#2563eb",
                        margin: "0 0 4px 0",
                      }}>
                      +3.5%
                    </Text>
                    <Text
                      style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
                      Expected Hashrate Increase
                    </Text>
                  </Column>
                  <Column style={{ width: "50%", textAlign: "center" }}>
                    <Text
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#059669",
                        margin: "0 0 4px 0",
                      }}>
                      $352M
                    </Text>
                    <Text
                      style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
                      Investment Amount
                    </Text>
                  </Column>
                </Row>
              </Section>

              {/* Call to Action */}
              <Section style={{ textAlign: "center", marginBottom: "24px" }}>
                <Button
                  href="#"
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
                <Text
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    margin: "8px 0 0 0",
                  }}>
                  Get the complete analysis and expert insights
                </Text>
              </Section>

              {/* Social Sharing */}
              <Hr
                style={{
                  border: "none",
                  borderTop: "1px solid #e5e7eb",
                  margin: "16px 0",
                }}
              />
              <Section style={{ textAlign: "center", marginBottom: "24px" }}>
                <Heading
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#374151",
                    marginBottom: "12px",
                  }}>
                  Share This Article
                </Heading>
                <Row>
                  <Column style={{ width: "33.33%", textAlign: "center" }}>
                    <Link
                      href="#"
                      style={{
                        backgroundColor: "#3b82f6",
                        color: "#ffffff",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        textDecoration: "none",
                        fontSize: "14px",
                        display: "inline-block",
                      }}>
                      📘 Facebook
                    </Link>
                  </Column>
                  <Column style={{ width: "33.33%", textAlign: "center" }}>
                    <Link
                      href="#"
                      style={{
                        backgroundColor: "#60a5fa",
                        color: "#ffffff",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        textDecoration: "none",
                        fontSize: "14px",
                        display: "inline-block",
                      }}>
                      🐦 Twitter
                    </Link>
                  </Column>
                  <Column style={{ width: "33.33%", textAlign: "center" }}>
                    <Link
                      href="#"
                      style={{
                        backgroundColor: "#1d4ed8",
                        color: "#ffffff",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        textDecoration: "none",
                        fontSize: "14px",
                        display: "inline-block",
                      }}>
                      💼 LinkedIn
                    </Link>
                  </Column>
                </Row>
              </Section>
            </Section>

            {/* Related Articles */}
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
                📚 You Might Also Like
              </Heading>
              {article.slice(1).map((item) => {
                return (
                  <Section
                    style={{
                      backgroundColor: "#ffffff",
                      padding: "12px",
                      borderRadius: "4px",
                      border: "1px solid #e5e7eb",
                      marginBottom: "12px",
                    }}>
                    <Heading
                      style={{
                        fontWeight: "bold",
                        fontSize: "14px",
                        color: "#111827",
                        marginBottom: "4px",
                      }}>
                      {item.title}
                    </Heading>
                    <Row>
                      <Column style={{ width: "50%" }}>
                        <Text
                          style={{
                            fontSize: "12px",
                            color: "#6b7280",
                            margin: 0,
                          }}>
                          May 14, 2025
                        </Text>
                      </Column>
                      <Column style={{ width: "50%", textAlign: "right" }}>
                        <Text
                          style={{
                            fontSize: "12px",
                            color: "#6b7280",
                            margin: 0,
                          }}>
                          3 min read
                        </Text>
                      </Column>
                    </Row>
                  </Section>
                );
              })}
              <Section
                style={{
                  backgroundColor: "#ffffff",
                  padding: "12px",
                  borderRadius: "4px",
                  border: "1px solid #e5e7eb",
                  marginBottom: "12px",
                }}>
                <Heading
                  style={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    color: "#111827",
                    marginBottom: "4px",
                  }}>
                  HIVE Targets 16 EH/s with Bitcoin-Backed Miner Purchases
                </Heading>
                <Row>
                  <Column style={{ width: "50%" }}>
                    <Text
                      style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
                      May 14, 2025
                    </Text>
                  </Column>
                  <Column style={{ width: "50%", textAlign: "right" }}>
                    <Text
                      style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
                      3 min read
                    </Text>
                  </Column>
                </Row>
              </Section>
            </Section>

            {/* Newsletter Signup */}
            <Section
              style={{
                padding: "16px",
                backgroundColor: "#eff6ff",
                border: "1px solid #e5e7eb",
                borderTop: "none",
                textAlign: "center",
              }}>
              <Heading
                style={{
                  fontWeight: "bold",
                  color: "#1e3a8a",
                  marginBottom: "8px",
                  fontSize: "16px",
                }}>
                Stay Updated
              </Heading>
              <Text
                style={{
                  fontSize: "14px",
                  color: "#1e40af",
                  marginBottom: "12px",
                }}>
                Get the latest crypto mining news delivered to your inbox
              </Text>
              <Text style={{ fontSize: "14px", color: "#1e40af", margin: 0 }}>
                Subscribe at our website to stay informed!
              </Text>
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
              <Heading
                style={{
                  fontWeight: "500",
                  color: "#1f2937",
                  marginBottom: "4px",
                  fontSize: "16px",
                }}>
                TheMinerMag
              </Heading>
              <Text
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  marginBottom: "12px",
                }}>
                Your trusted source for cryptocurrency mining news and analysis
              </Text>

              <Row style={{ marginBottom: "12px" }}>
                <Column style={{ width: "33.33%", textAlign: "center" }}>
                  <Link
                    href="#"
                    style={{
                      color: "#2563eb",
                      fontSize: "12px",
                      textDecoration: "underline",
                    }}>
                    Visit Website
                  </Link>
                </Column>
                <Column style={{ width: "33.33%", textAlign: "center" }}>
                  <Link
                    href="#"
                    style={{
                      color: "#2563eb",
                      fontSize: "12px",
                      textDecoration: "underline",
                    }}>
                    All Articles
                  </Link>
                </Column>
                <Column style={{ width: "33.33%", textAlign: "center" }}>
                  <Link
                    href="#"
                    style={{
                      color: "#2563eb",
                      fontSize: "12px",
                      textDecoration: "underline",
                    }}>
                    Market Data
                  </Link>
                </Column>
              </Row>

              <Hr
                style={{
                  border: "none",
                  borderTop: "1px solid #d1d5db",
                  margin: "12px 0",
                }}
              />

              <Text
                style={{
                  marginBottom: "8px",
                  fontSize: "12px",
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
                      fontSize: "12px",
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
                      fontSize: "12px",
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
